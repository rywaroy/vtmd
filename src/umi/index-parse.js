
const traverse = require('@babel/traverse').default;
const filterComment = require('../common/comment-parse');
const dataParse = require('../common/data-parse');
const methodParse = require('../common/method-parse');

const lifecycle = ['componentDidMount', 'componentWillUnmount', 'render', 'componentWillMount', 'componentWillReceiveProps', 'shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate'];

/**
 * 解析 index.jsx? 文件
 * @param {Object} ast - ast树
 */
module.exports = function indexParse(ast) {
    const index = {
        main: [],
        state: [],
        methods: [],
        props: [],
    };
    traverse(ast, {
        ExportDefaultDeclaration(path) {
            if (path.node.declaration.type === 'FunctionDeclaration') {
                /**
                * 导出函数式组件
                * @example
                * export default function Component(props) {
                *
                * }
                */
                index.main = parseFunctionDeclaration(path);
            }

            if (path.node.declaration.type === 'ClassDeclaration') {
                /**
                * 导出类组件
                * @example
                * export default class Component extends react.Component {
                *
                * }
                */
                if (path.node.leadingComments) {
                    index.main = filterComment(path.node.leadingComments);
                }
                const body = path.node.declaration.body.body;
                const obj = parseClassDeclaration(body);
                index.state = obj.state;
                index.methods = obj.methods;
            }

            if (path.node.declaration.type === 'Identifier') {
                /**
                 * 导出变量
                 * @example
                 * class Component extends react.Component {}
                 * export default Component;
                 */
                const identifier = path.node.declaration.name;
                traverse(ast, createVisitor(index, identifier));
            }
        },
    });
    console.log(JSON.stringify(index));
};

/**
 * 解析函数式组件方法
 * @param {Object} path - traverse的path对象
 * @returns {Array} - 注释对象
 */
function parseFunctionDeclaration(path) {
    if (path.node.leadingComments) {
        return filterComment(path.node.leadingComments);
    }
    return [];
}

/**
 * 解析类组件方法
 * @param {Array} body - class内容
 * @param {Object} - 页面index对象
 */
function parseClassDeclaration(body) {
    const index = {
        state: [],
        methods: [],
    };
    body.forEach(item => {
        // 判断是函数
        if (item.type === 'ClassMethod') {
            /**
             * 判断是constructor函数
             * @example
             * constructor() {
             *   this.state = {};
             * }
            */
            if (item.key.name === 'constructor') {
                index.state = parseConstructorFunction(item.body.body);
            } else { // 普通函数
                // 判断是否是react的生命周期,如果是则过滤
                if (lifecycle.indexOf(item.key.name) === -1) {
                    index.methods.push(methodParse(item));
                }
            }
        }

        // 判断是属性
        if (item.type === 'ClassProperty') {
            /**
             * 判断是state属性
             * @example
             * state = {
             *   id: 1,
             * }
             */
            if (item.key.name === 'state') {
                index.state = dataParse(item.value.properties);
            } else if (item.value.type === 'ArrowFunctionExpression') {
                /**
                 * 判断是方法
                 * @example
                 * queryList = () => {
                 *
                 * }
                 */
                index.methods.push(methodParse(item));
            }
        }
    });
    return index;
}

/**
 * 解析constructor函数
 * @param {Array} body - constructor函数内容
 * @return {Array} - 解析后的注释对象
 */
function parseConstructorFunction(body) {
    let stateArray = [];
    body.forEach(item => {
        /**
         * 判断是赋值表达式,且左边的值是state
         */
        if (item.expression.type === 'AssignmentExpression' && item.expression.left.property.name === 'state') {
            stateArray = dataParse(item.expression.right.properties);
        }
    });
    return stateArray;
}

/**
 * 创建遍历器
 * @param {Object} index - 页面index对象
 * @param {String} identifier - 遍历名称
 * @returns {Object} - visitor对象
 */
function createVisitor(index, identifier) {
    return {
        FunctionDeclaration(p) {
            index.main = parseFunctionDeclaration(p);
        },
        ClassDeclaration(p) {
            if (p.node.id.name === identifier) {
                index.main = filterComment(p.node.leadingComments);
                const obj = parseClassDeclaration(p.node.body.body);
                index.state = obj.state;
                index.methods = obj.methods;
            }
        },
    };
}

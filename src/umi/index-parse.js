
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
                const identifier = path.node.declaration.id.name;
                traverse(ast, createPropsVisitor(index, identifier));
            }

            if (path.node.declaration.type === 'Identifier') {
                /**
                 * 导出变量
                 * @example
                 * class Component extends react.Component {}
                 * export default Component;
                 */
                const identifier = path.node.declaration.name;
                traverse(ast, createVisitor(index, identifier, ast));
            }

            if (path.node.declaration.type === 'CallExpression') {
                /**
                 * 导出表达式
                 * @example
                 * class Component extends react.Component {}
                 * export default connect(({ global }) => ({ global }))(Component);
                 * // or
                 * export default Form.create()(Component);
                 * // or
                 * export default connect(({ global }) => ({ global }))(Form.create()(Component));
                 */

                if (path.node.declaration.arguments.length > 0) {
                    const argument = path.node.declaration.arguments[0];
                    let identifier;
                    if (argument.type === 'Identifier') {
                        identifier = argument.name;
                    }
                    if (argument.type === 'CallExpression') {
                        identifier = argument.arguments[0].name;
                    }
                    traverse(ast, createVisitor(index, identifier, ast));
                }
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
 * @param {Object} ast - ast对象
 * @returns {Object} - visitor对象
 */
function createVisitor(index, identifier, ast) {
    return {
        FunctionDeclaration(path) {
            index.main = parseFunctionDeclaration(path);
        },
        ClassDeclaration(path) {
            if (path.node.id.name === identifier) {
                index.main = filterComment(path.node.leadingComments);
                const obj = parseClassDeclaration(path.node.body.body);
                index.state = obj.state;
                index.methods = obj.methods;
                traverse(ast, createPropsVisitor(index, identifier));
            }
        },
        VariableDeclaration(path) {
            /**
             * 使用Form组件的情况
             * @example
             * const ComponentForm = Form.create()(Component);
             * export default ComponentForm
             */
            path.node.declarations.forEach(item => {
                if (item.id.name === identifier) {
                    const id = item.init.arguments[0].name;
                    traverse(ast, createVisitor(index, id, ast));
                }
            });
        },
    };
}

/**
 * 穿件props遍历器
 * @param {Object} index - 页面index对象
 * @param {String} identifier - 遍历名称
 * @returns {Object} - visitor对象
 */
function createPropsVisitor(index, identifier) {
    return {
        ExpressionStatement(path) {
            /**
             * 解析props，遍历陈述语句
             * @example
             * Component.defaultProps = {}
             * Component.propTypes = {};
             */
            const left = path.node.expression.left;
            const right = path.node.expression.right;
            if (left.type === 'MemberExpression' && left.object.name === identifier) {
                if (left.property.name === 'defaultProps') {
                    const df = {};
                    right.properties.forEach(item => {
                        if (item.value.type === 'StringLiteral' || item.value.type === 'NumericLiteral' || item.value.type === 'BooleanLiteral') { // 存储字符串、数字、布尔类型的默认值
                            df[item.key.name] = item.value.value;
                        }
                    });
                    index.defaultProps = df;
                }

                if (left.property.name === 'propTypes') {
                    const types = [];
                    for (let i = 0; i < right.properties.length; i++) {
                        const obj = {
                            name: right.properties[i].key.name,
                            type: right.properties[i].value.property.name,
                        };
                        // 最后一项取trailingComments内容
                        if (i === right.properties.length - 1) {
                            if (right.properties[i].trailingComments) {
                                obj.value = filterComment(right.properties[i].trailingComments);
                            }
                        } else { // 不是最后一项取下一项的leadingComments内容
                            if (right.properties[i + 1].leadingComments) {
                                obj.value = filterComment(right.properties[i + 1].leadingComments);
                            }
                        }
                        types.push(obj);
                    }
                    index.props = types;
                }
            }
        },
    };
}

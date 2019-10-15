const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const fs = require('fs');
const filterComment = require('../common/comment-parse');
const getData = require('../common/parse-data');

module.exports = function umiAstParse(file) {
    const notes = {};
    if (file.index) {
        notes.index = indexParse(fs.readFileSync(file.index, 'utf-8'));
    }
    return notes;
};

function indexParse(script) {
    const index = {};
    const ast = babelParser.parse(script, {
        sourceType: 'module',
        plugins: [
            'classProperties',
            'jsx',
        ],
    });
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
                parseFunctionDeclaration(index, path);
            }

            if (path.node.declaration.type === 'ClassDeclaration') {
                /**
                * 导出类组件
                * @example
                * export default class Component extends react.Component {
                *
                * }
                */
                parseClassDeclaration(index, path);
            }
        },
    });
    // console.log(index.main);
}

/**
 * 解析函数式组件方法
 * @param {Object} index - 页面文档对象
 * @param {Object} path - traverse的path对象
 */
function parseFunctionDeclaration(index, path) {
    if (path.node.leadingComments) {
        index.main = filterComment(path.node.leadingComments);
    }
}

/**
 * 解析类组件方法
 * @param {Object} index - 页面文档对象
 * @param {Object} path - traverse的path对象
 */
function parseClassDeclaration(index, path) {
    if (path.node.leadingComments) {
        index.main = filterComment(path.node.leadingComments);
    }

    const ClassBody = path.node.declaration.body.body; // 获取class中的内容
    ClassBody.forEach(item => {
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
            }
        }
    });
}

/**
 * 解析constructor函数
 * @param {Array} body - constructor函数内容
 */
function parseConstructorFunction(body) {
    let stateArray = [];
    body.forEach(item => {
        /**
         * 判断是赋值表达式,且左边的值是state
         */
        if (item.expression.type === 'AssignmentExpression' && item.expression.left.property.name === 'state') {
            stateArray = getData(item.expression.right.properties);
        }
    });
    return stateArray;
}

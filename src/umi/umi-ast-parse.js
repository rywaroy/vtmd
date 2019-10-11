const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const fs = require('fs');
const filterComment = require('../common/comment-parse');

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
    });

    traverse(ast, {
        ExportDefaultDeclaration(path) {
            /**
             * 导出函数式组件
             * @example
             * export default function Component(params) {
             *
             * }
             */
            if (path.node.declaration.type === 'FunctionDeclaration') {
                parseFunctionDeclaration(index, path);
            }
        },
    });
    console.log(index.main);
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

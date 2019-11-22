const traverse = require('@babel/traverse').default;
const filterComment = require('../common/comment-parse');

/**
 * 解析 map.js 文件
 * @param {Object} ast - ast树
 */
module.exports = function mapParse(ast) {
    const map = [];
    traverse(ast, {
        ExportNamedDeclaration(path) {
            const obj = {};
            if (path.node.declaration.type === 'VariableDeclaration') {
                /**
                 * 导出表达式
                 * @example
                 * export const listFiltles = [];
                 */
                obj.name = path.node.declaration.declarations[0].id.name;
                if (path.node.leadingComments) {
                    obj.value = filterComment(path.node.leadingComments);
                }
            }
            if (path.node.declaration.type === 'FunctionDeclaration') {
                /**
                 * 导出函数
                 * @example
                 * export function listFiltles() {};
                 */
                obj.name = path.node.declaration.id.name;
                if (path.node.leadingComments) {
                    obj.value = filterComment(path.node.leadingComments);
                }
            }
            map.push(obj);
        },
    });
    return map;
};

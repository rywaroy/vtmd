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
            map.push({
                name: path.node.declaration.id.name,
                value: filterComment(path.node.leadingComments),
            });
        },
    });
    return map;
};

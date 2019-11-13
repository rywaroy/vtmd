const traverse = require('@babel/traverse').default;
const filterComment = require('../common/comment-parse');

/**
 * 解析 map.js 文件
 * @param {Object} ast - ast树
 */
module.exports = function modelParse(ast) {
    const model = {};
    traverse(ast, {
        ExportDefaultDeclaration(path) {
            const properties = path.node.declaration.properties;
            properties.forEach(item => {
                if (item.key.name === 'namespace') {
                    model.namespace = item.value.value;
                }
            });
        },
    });
    return model;
};

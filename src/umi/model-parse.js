const traverse = require('@babel/traverse').default;
const filterComment = require('../common/comment-parse');
const dataParse = require('../common/data-parse');

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
                // 获取namespace
                if (item.key.name === 'namespace') {
                    model.namespace = item.value.value;
                }
                // 获取state
                if (item.key.name === 'state') {
                    /**
                     * 判断是对象
                     * @example
                     * state: {
                     *  a: 1,
                     *  b: 2,
                     * }
                     */
                    if (item.value.type === 'ObjectExpression') {
                        model.state = dataParse(item.value.properties);
                    }
                }
            });
        },
    });
    console.log(JSON.stringify(model));
    return model;
};

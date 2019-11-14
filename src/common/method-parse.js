const filterComment = require('./comment-parse');

/**
 * 解析单个method注释
 * @param {Object}
 */
module.exports = function methodParse(method) {
    if (method.key) {
        const obj = {};
        obj.name = method.key.name;
        obj.generator = method.generator;
        obj.async = method.async;
        if (method.leadingComments) {
            obj.value = filterComment(method.leadingComments);
        }
        return obj;
    } else if (method.argument && method.argument.type === 'CallExpression') {
        method.argument.arguments[0].properties.forEach(prop => {
            const objProp = {};
            objProp.name = prop.key.name;
            if (prop.leadingComments) {
                objProp.value = filterComment(prop.leadingComments);
            }
            return objProp;
        });
    }
};

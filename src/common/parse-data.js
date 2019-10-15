const filterComment = require('./comment-parse');

/**
 * 获取data/state内容
 * @param {Array} props
 * @returns {Array}
 */
module.exports = function getData(props) {
    const arr = [];
    for (let i = 0; i < props.length; i++) {
        const obj = {
            name: props[i].key.name,
        };
        // 最后一项取trailingComments内容
        if (i === props.length - 1) {
            if (props[i].trailingComments) {
                obj.value = filterComment(props[i].trailingComments);
            }
        } else { // 不是最后一项取下一项的leadingComments内容
            if (props[i + 1].leadingComments) {
                obj.value = filterComment(props[i + 1].leadingComments);
            }
        }
        if (props[i].value.type === 'NumericLiteral') {
            obj.type = 'Number';
        }
        if (props[i].value.type === 'StringLiteral') {
            obj.type = 'String';
        }
        if (props[i].value.type === 'ArrayExpression') {
            obj.type = 'Array';
        }
        if (props[i].value.type === 'ObjectExpression') {
            obj.type = 'Object';
            /**
             * @example
             * a: { // 判断这种情况的注释
             *  b: 1,
             * }
             */
            if (props[i].value.properties.length > 0) {
                if (props[i].value.properties[0].leadingComments) {
                    obj.value = filterComment(props[i].value.properties[0].leadingComments);
                }
            } else {
                /**
                 * @example
                 * a: { // 判断这种情况的注释
                 *
                 * }
                */
                if (props[i].value.innerComments) {
                    obj.value = filterComment(props[i].value.innerComments);
                }
            }
        }
        if (props[i].value.type === 'NullLiteral') {
            obj.type = 'Any';
        }
        arr.push(obj);
    }
    return arr;
};

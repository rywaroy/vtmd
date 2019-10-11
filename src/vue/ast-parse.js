const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const filterComment = require('../common/comment-parse');

module.exports = function astParse(script) {
    const notes = {};
    const ast = babelParser.parse(script, {
        sourceType: 'module',
    });
    traverse(ast, {
        ExportDefaultDeclaration(path) {
            // 解析文档介绍注释
            if (path.node.leadingComments) {
                notes.main = filterComment(path.node.leadingComments);
            }

            if (path.node.declaration.properties.length > 0) {
                path.node.declaration.properties.forEach(item => {
                    // 获取vue组件name
                    if (item.key.name === 'name') {
                        notes.name = item.value.value;
                    }

                    // 获取vue组件props
                    if (item.key.name === 'props') {
                        notes.props = getProps(item.value);
                    }

                    // 获取vue组件的data
                    if (item.key.name === 'data') {
                        notes.data = getData(item.body.body[0].argument.properties);
                    }

                    // 获取vue组件的methods、computed、filters、watch
                    if (item.key.name === 'methods' || item.key.name === 'computed' || item.key.name === 'filters' || item.key.name === 'watch') {
                        notes[item.key.name] = getMethods(item.value.properties);
                    }
                });
            }
        },
    });
    return notes;
};

/**
 * 获取props内容
 * @param {Object} obj
 * @returns {Object}
 */
function getProps(obj) {
    // 数组形式props
    if (obj.type === 'ArrayExpression') {
        return obj.elements.map(item => ({ name: item.value }));
    }

    // 对象形式props
    if (obj.type === 'ObjectExpression') {
        const props = [];
        for (let i = 0; i < obj.properties.length; i++) {
            const prop = {};
            const propertie = obj.properties[i];
            prop.name = propertie.key.name;
            if (propertie.leadingComments) {
                prop.value = filterComment(propertie.leadingComments);
            }

            // key: String形式
            if (propertie.value.type === 'Identifier') {
                prop.type = propertie.value.name;
            }

            // key: [] 数组形式
            if (propertie.value.type === 'ArrayExpression') {
                prop.type = propertie.value.elements.map(e => e.name).join(' | ');
            }

            // key: {} 对象形式
            if (propertie.value.type === 'ObjectExpression') {
                propertie.value.properties.forEach(item => {
                    if (item.key.name === 'type') {
                        if (item.value.type === 'ArrayExpression') {
                            prop.type = item.value.elements.map(e => e.name).join(' | ');
                        } else {
                            prop.type = item.value.name;
                        }
                    }

                    if (item.key.name === 'default') {
                        // 非函数
                        if (item.value.type !== 'ArrowFunctionExpression' && item.value.type !== 'FunctionExpression') {
                            prop.default = item.value.value;
                        } else {
                            prop.default = 'Function Return';
                        }
                    }

                    if (item.key.name === 'required') {
                        prop.required = item.value.value;
                    }
                });
            }
            props.push(prop);
        }
        return props;
    }
}

/**
 * 获取data内容
 * @param {Array} props
 * @returns {Array}
 */
function getData(props) {
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
}

/**
 * 获取methods内容
 * @param {Array} props
 * @returns {Array}
 */
function getMethods(props) {
    const arr = [];
    props.forEach(item => {
        if (item.key) {
            const obj = {};
            obj.name = item.key.name;
            if (item.leadingComments) {
                obj.value = filterComment(item.leadingComments);
            }
            arr.push(obj);
        } else if (item.argument && item.argument.type === 'CallExpression') {
            item.argument.arguments[0].properties.forEach(prop => {
                const objProp = {};
                objProp.name = prop.key.name;
                if (prop.leadingComments) {
                    objProp.value = filterComment(prop.leadingComments);
                }
                arr.push(objProp);
            });
        }
    });
    return arr;
}

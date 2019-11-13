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

                    /**
                     * 判断是函数返回的对象
                     * @example
                     * state: initState(),
                     */
                    if (item.value.type === 'CallExpression') {
                        const identifier = item.value.callee.name;
                        traverse(ast, createStateVisitor(model, identifier));
                    }
                }
            });
        },
    });
    console.log(JSON.stringify(model));
    return model;
};

/**
 * 创建state遍历器
 * @param {Object} model - model对象
 * @param {String} identifier - 遍历名称
 */
function createStateVisitor(model, identifier) {
    return {
        VariableDeclaration(path) {
            path.node.declarations.forEach(item => {
                if (item.id.name === identifier) {
                    /**
                     * 箭头函数表达式变量声明
                     * @example
                     * const initState = () => {}
                     */
                    if (item.init.type === 'ArrowFunctionExpression') {
                        /**
                         * 箭头函数对象表达式
                         * @example
                         * const initState = () => ({
                         *   a: 1,
                         * })
                         */
                        if (item.init.body.type === 'ObjectExpression') {
                            model.state = dataParse(item.init.body.properties);
                        }

                        /**
                         * 箭头函数块状语句
                         * @example
                         * const initState = () => {
                         *  return {
                         *    a: 1
                         *  }
                         * }
                         */
                        if (item.init.body.type === 'BlockStatement') {
                            item.init.body.body.forEach(bs => {
                                if (bs.type === 'ReturnStatement') {
                                    model.state = dataParse(bs.argument.properties);
                                }
                            });
                        }
                    }

                    /**
                     * 函数表达式变量声明
                     * @example
                     * const initState = function() {}
                     */
                    if (item.init.type === 'FunctionExpression') {
                        item.init.body.body.forEach(bs => {
                            if (bs.type === 'ReturnStatement') {
                                model.state = dataParse(bs.argument.properties);
                            }
                        });
                    }
                }
            });
        },
        FunctionDeclaration(path) {
            /**
             * 函数声明
             * @example
             * function initState() {}
             */
            path.node.body.body.forEach(bs => {
                if (bs.type === 'ReturnStatement') {
                    model.state = dataParse(bs.argument.properties);
                }
            });
        },
    };
}

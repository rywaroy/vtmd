const fs = require('fs');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('babel-types');
const resolve = require('./resolve');

/**
 * 更新vuepress config配置
 */
module.exports = function updateVuepressConfig() {
    // 生成md文件后，遍历所有md文件，自动配置.vuepress/config.js
    const files = fs.readdirSync(resolve('./docs'));
    const mdFiles = files.filter(file => /.*\.md/.test(file));

    const ast = babelParser.parse(fs.readFileSync(resolve('./docs/.vuepress/config.js'), 'utf-8'), {
        sourceType: 'module',
    });
    traverse(ast, {
        ObjectProperty(path) {
            if (path.node.key.name === 'sidebar') {
                const elements = [];
                mdFiles.forEach(file => {
                    elements.push(t.stringLiteral(file === ('index.md' || '首页.md') ? '/' : file));
                });
                path.node.value.elements = elements;
            }
        },
    });
    const output = generate(ast);
    fs.writeFileSync(resolve('./docs/.vuepress/config.js'), output.code);
};

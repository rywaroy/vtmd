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
        FunctionDeclaration(path) { // 函数式组件
            if (path.node.leadingComments) {
                index.main = filterComment(path.node.leadingComments);
            }
        },
    });
    console.log(index);
}


const fs = require('fs');
const babelParser = require('@babel/parser');
const indexParse = require('./index-parse');


module.exports = function umiAstParse(file) {
    const notes = {};
    if (file.index) {
        const ast = babelParser.parse(fs.readFileSync(file.index, 'utf-8'), {
            sourceType: 'module',
            plugins: [
                'classProperties',
                'jsx',
            ],
        });
        notes.index = indexParse(ast);
    }
    return notes;
};

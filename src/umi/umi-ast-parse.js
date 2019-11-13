
const fs = require('fs');
const babelParser = require('@babel/parser');
const indexParse = require('./index-parse');
const mapParse = require('./map-parse');


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
    if (file.map) {
        const ast = babelParser.parse(fs.readFileSync(file.map, 'utf-8'), {
            sourceType: 'module',
        });
        notes.map = mapParse(ast);
    }
    return notes;
};

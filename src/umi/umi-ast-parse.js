
const fs = require('fs');
const babelParser = require('@babel/parser');
const indexParse = require('./index-parse');
const mapParse = require('./map-parse');
const modelParse = require('./model-parse');

module.exports = function umiAstParse(file) {
    const notes = {};
    // 解析index.jsx?文件
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

    // 解析map.js文件
    if (file.map) {
        const ast = babelParser.parse(fs.readFileSync(file.map, 'utf-8'), {
            sourceType: 'module',
            plugins: [
                'jsx',
            ],
        });
        notes.map = mapParse(ast);
    }

    // 解析model.js文件
    if (file.models.length > 0) {
        notes.models = [];
        file.models.forEach(item => {
            const ast = babelParser.parse(fs.readFileSync(item.url, 'utf-8'), {
                sourceType: 'module',
            });
            notes.models.push({
                ast: modelParse(ast),
                filename: item.filename,
            });
        });
    }

    // 解析components
    if (file.components.length > 0) {
        notes.components = [];
        file.components.forEach(item => {
            const ast = babelParser.parse(fs.readFileSync(item.url, 'utf-8'), {
                sourceType: 'module',
                plugins: [
                    'classProperties',
                    'jsx',
                ],
            });
            notes.components.push({
                ast: indexParse(ast),
                filename: item.filename,
            });
        });
    }
    notes.url = file.url;
    notes.urlName = file.urlName;
    notes.baseUrl = file.baseUrl;
    notes.filename = file.filename;
    notes.mapFilename = file.mapFilename;
    return notes;
};

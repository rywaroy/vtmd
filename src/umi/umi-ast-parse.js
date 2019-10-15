
const fs = require('fs');
const indexParse = require('./index-parse');


module.exports = function umiAstParse(file) {
    const notes = {};
    if (file.index) {
        notes.index = indexParse(fs.readFileSync(file.index, 'utf-8'));
    }
    return notes;
};

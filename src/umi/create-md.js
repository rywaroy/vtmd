const fs = require('fs');
const path = require('path');
const getNote = require('../common/get-note');

module.exports = function create(notes, options) {
    let name = notes.urlName;
    if (notes.index.main && getNote(notes.index.main).title) {
        name = getNote(notes.index.main).title.value;
    }

    const md = createMd(notes, name);

    // fs.writeFile(`${path.join(process.cwd(), options.output, `${name}.md`)}`, md, (err) => {
    //     if (err) throw err;
    //     console.log(`${filename}转换成功`);
    // });
};

function createMd(notes, name) {

}

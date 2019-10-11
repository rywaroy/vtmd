const resolve = require('../common/resolve');
const fileDisplay = require('./file-display');
const umiAstParse = require('./umi-ast-parse');

module.exports = function createUmiDocument(options) {
    let umiFiles = [];

    if (options.target.length > 0) {
    // 配置过目标文件则解析目标文件
        for (let i = 0; i < options.target.length; i++) {
            umiFiles = umiFiles.concat(fileDisplay(resolve(options.target[i]), resolve(options.ignore), options.target[i]));
        }
    } else {
        umiFiles = umiFiles.concat(fileDisplay(resolve(options.entry), resolve(options.ignore), options.entry));
    }
    umiFiles.forEach(file => {
        const notes = umiAstParse(file);
        console.log(notes);
    });
};

const resolve = require('../common/resolve');
const fileDisplay = require('./file-display');
const umiAstParse = require('./umi-ast-parse');
const creatProgress = require('../common/create-progress');

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
    const total = umiFiles.length;
    let num = 0;
    umiFiles.forEach(file => {
        creatProgress(num, total, `正在解析${file.baseUrl}`);
        const notes = umiAstParse(file);
        num++;
        // console.log(notes);
    });
    creatProgress(num, total, '解析完成!');
};

const log = require('single-line-log').stdout;
require('colors');
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
    const total = umiFiles.length;
    let num = 0;
    umiFiles.forEach(file => {
        creatProgress(num, total, `正在解析${file.baseUrl}`);
        const notes = umiAstParse(file);
        num++;
        creatProgress(num, total, `${file.baseUrl} 解析完成`);
        // console.log(notes);
    });
    creatProgress(num, total, '解析完成!');
};

function creatProgress(num, total, text) {
    const percent = num / total;
    const done = Math.floor(20 * percent);
    const none = 20 - done;
    let p = '';
    for (let i = 0; i < done; i++) {
        p += '▇'.green;
    }
    for (let i = 0; i < none; i++) {
        p += '▇'.gray;
    }
    log(`${text}
${'· vtmd'.green} ${p}  ${num}/${total}
`);
}

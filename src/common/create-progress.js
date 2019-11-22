const log = require('single-line-log').stdout;
require('colors');

/**
 * 创建进度条
 * @param {Number} num - 当前进度
 * @param {Number} total - 总进度
 * @param {String} text - 文字展示
 */
module.exports = function creatProgress(num, total, text) {
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
${'● vtmd'.green} ${p}  ${num}/${total}
`);
};

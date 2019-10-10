const path = require('path');
const resolve = require('../common/resolve');
const fileDisplay = require('./file-display');

module.exports = function createUmiDocument(options) {
  let umiFiles = [];

  if (options.target.length > 0) {
  // 配置过目标文件则解析目标文件
    for (let i = 0; i < options.target.length; i++) {
      umiFiles = umiFiles.concat(fileDisplay(resolve(options.target[i]), resolve(options.ignore)));
    }
  }
  console.log(umiFiles);
};

const path = require('path');
const fileDisplay = require('./file-display');
const vueTemplateCompiler = require('./vue-template-compiler');
const astParse = require('./ast-parse');
const create = require('./create-md');
const resolve = require('../common/resolve');


module.exports = function createVueDocument(options) {
  let vueFiles;

  if (options.target.length > 0) {
  // 配置过目标文件则解析目标文件
    const files = [];
    for (let i = 0; i < options.target.length; i++) {
      if (path.extname(options.target[i]) !== '.vue') {
        options.target[i] = `${options.target[i]}.vue`;
      }
      files[i] = {};
      files[i].filedir = resolve(options.target[i]);
      files[i].filename = path.basename(files[i].filedir);
    }
    vueFiles = files;
  } else {
  // 遍历查找所有vue文件夹
    vueFiles = fileDisplay(resolve(options.entry), resolve(options.ignore));
  }

  vueFiles.forEach((file) => {
  // 解析vue文件
    const cs = vueTemplateCompiler(file.filedir);

    // 解析ast，获取注释
    const notes = astParse(cs);

    // 创建md文件
    create(notes, file.filename, options);
  });
};

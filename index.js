#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const fs = require('fs');
const fileDisplays = require('./src/file-display');
const vueTemplateCompiler = require('./src/vue-template-compiler');
const astParse = require('./src/ast-parse');

program
  .version('0.0.1')
  .option('--config <path>', 'config');


program.parse(process.argv);

let configPath;
const optionsDefault = {
  path: 'src/compontents',
  compontent: false,
  ignore: null,
};

if (program.config) {
  configPath = resolve(program.config);
} else {
  configPath = resolve('./vtmd.config.js');
}

const exists = fs.existsSync(configPath);
let options;
if (exists) {
  const configOptions = require(configPath);
  options = {
    ...optionsDefault,
    ...configOptions,
  };
} else {
  options = optionsDefault;
}

if (typeof options.ignore === 'string') {
  options.ignore = [options.ignore];
}

// 遍历查找所有vue文件夹
const vueFiles = fileDisplays(resolve(options.path), resolve(options.ignore));

vueFiles.forEach((filePath) => {
  // 解析vue文件
  const cs = vueTemplateCompiler(filePath);

  // 解析ast，获取注释
  astParse(cs);
});


function resolve(p) {
  if (!p) {
    return p;
  }
  if (Array.isArray(p)) {
    return p.map(item => path.join(__dirname, item));
  }
  return path.join(__dirname, p);
}

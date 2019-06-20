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
};

if (program.config) {
  configPath = path.resolve(__dirname, program.config);
} else {
  configPath = path.resolve(__dirname, './vtmd.config.js');
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

// 遍历查找所有vue文件夹
const vueFiles = fileDisplays(path.resolve(__dirname, options.path));

vueFiles.forEach((filePath) => {
  // 解析vue文件
  const cs = vueTemplateCompiler(filePath);
  // console.log();

  // 解析ast，查到注释
  astParse(cs);
});

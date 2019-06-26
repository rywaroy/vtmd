#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const fs = require('fs');
const fileDisplay = require('./src/file-display');
const vueTemplateCompiler = require('./src/vue-template-compiler');
const astParse = require('./src/ast-parse');
const create = require('./src/create-md');

const processPath = process.cwd();

program
  .version('0.0.1')
  .option('--config <path>', 'config');


program.parse(process.argv);

let configPath;
const optionsDefault = {
  entry: 'src',
  compontent: false,
  ignore: null,
  output: 'docs',
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
const vueFiles = fileDisplay(resolve(options.entry), resolve(options.ignore));

vueFiles.forEach((file) => {
  // 解析vue文件
  const cs = vueTemplateCompiler(file.filedir);

  // 解析ast，获取注释
  const notes = astParse(cs);
  // console.log(notes);
  create(notes, file.filename, options);
});


function resolve(p) {
  if (!p) {
    return p;
  }
  if (Array.isArray(p)) {
    return p.map(item => path.join(processPath, item));
  }
  return path.join(processPath, p);
}

#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const fs = require('fs');
const fileDisplay = require('./src/file-display');
const vueTemplateCompiler = require('./src/vue-template-compiler');
const astParse = require('./src/ast-parse');
const create = require('./src/create-md');
const createVueComponent = require('./src/create-vue-component');

const processPath = process.cwd();

program
  .version('2.0')
  .option('--config <path>', 'config')
  .option('--component', 'component')
  .option('--umi', 'umi');


program.parse(process.argv);

let configPath;

// 默认配置
const optionsDefault = {
  entry: 'src',
  compontent: false,
  ignore: null,
  output: 'docs',
  target: [],
};

// 获取参数
if (program.args.length > 0) {
  optionsDefault.target = program.args;
}

// 判断是否组件模式
if (program.component) {
  optionsDefault.compontent = true;

  // 创建vue组件
  createVueComponent();
}

// 判断是否设置自定义配置
if (program.config) {
  configPath = resolve(program.config);
} else {
  // 未设置定义配置则默认使用当前目录下vtmd.config.js
  configPath = resolve('vtmd.config.js');
}

// 判断配置文件是否存在
const exists = fs.existsSync(configPath);
let options;
if (exists) {
  // 存在配置文件则合并配置
  const configOptions = require(configPath);
  options = {
    ...optionsDefault,
    ...configOptions,
  };
} else {
  // 不存在配置文件则使用默认配置
  options = optionsDefault;
}

if (typeof options.ignore === 'string') {
  options.ignore = [options.ignore];
}

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


function resolve(p) {
  if (!p) {
    return p;
  }
  if (Array.isArray(p)) {
    return p.map(item => path.join(processPath, item));
  }
  return path.join(processPath, p);
}

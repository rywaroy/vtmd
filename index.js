#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const fs = require('fs');
const compiler = require('vue-template-compiler');

program
  .version('0.0.1')
  .option('--config <path>', 'config');


program.parse(process.argv);

let configPath;
const optionsDefault = {
  path: 'src/compontents',
  compontent: false,
};
const vueFiles = [];

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

fileDisplay(path.resolve(__dirname, options.path));

vueFiles.forEach((filePath) => {
  const cs = vueTemplateCompiler(filePath);
});

// 遍历查找所有vue文件夹
function fileDisplay(filePath) {
  const files = fs.readdirSync(filePath);
  files.forEach((filename) => {
    const filedir = path.join(filePath, filename);
    const stats = fs.statSync(filedir);
    const isFile = stats.isFile(); // 是文件
    const isDir = stats.isDirectory(); // 是文件夹
    if (isFile && path.extname(filedir) === '.vue') {
      vueFiles.push(filedir);
    }
    if (isDir) {
      fileDisplay(filedir); // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
    }
  });
}

// 解析vue文件
function vueTemplateCompiler(filePath) {
  const file = fs.readFileSync(filePath, 'utf-8');
  const parsedComponent = compiler.parseComponent(file);
  const scriptContent = parsedComponent.script ? parsedComponent.script.content : '';
  return scriptContent;
}

// 解析ast，查到注释

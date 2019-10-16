#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const createVueComponent = require('./src/common/create-vue-component');
const createVueDocument = require('./src/vue');
const createUmiDocument = require('./src/umi');
const resolve = require('./src/common/resolve');

program
    .version('2.0.0')
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

if (program.umi) {
    createUmiDocument(options);
} else {
    createVueDocument(options);
}

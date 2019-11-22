const fs = require('fs');
const path = require('path');

/**
 * 遍历文件结构
 * @param {String} filePaths - 绝对路径
 * @param {String} ignorePaths - 忽略的路径
 * @param {String} relativePath - 相对路径
 * @returns {Array} umifiles - umi文件
 */
module.exports = function fileDisplay(filePaths, ignorePaths, relativePath) {
    const umifiles = [];
    const stack = relativePath.split('/'); // 路由栈
    stack.pop();
    function fileDisplayDeep(filePath) {
        if (ignorePaths && ignorePaths.includes(filePath)) {
            return;
        }
        const fileName = path.basename(filePath); // 获取文件夹名
        stack.push(fileName);
        const files = fs.readdirSync(filePath);
        const filesObj = {
            index: '',
            map: '',
            models: [],
            components: [],
        }; // 文件对象，包含index.js map.js model.js等
        files.forEach((filename) => {
            const filedir = path.join(filePath, filename); // 绝对路径
            const stats = fs.statSync(filedir);
            const isFile = stats.isFile(); // 是文件
            const isDir = stats.isDirectory(); // 是文件夹
            if (isDir) { // 判断是文件夹
                if (filename === 'models') { // 判断是models文件夹，遍历该文件夹
                    const models = fs.readdirSync(filedir);
                    models.forEach(item => {
                        filesObj.models.push({
                            url: path.join(filedir, item),
                            filename: item,
                        });
                    });
                } else if (filename === 'components') { // 判断是components文件夹，遍历该文件夹
                    const components = fs.readdirSync(filedir);
                    components.forEach(item => {
                        if (/.*\.jsx?/.test(item)) {
                            filesObj.components.push({
                                url: path.join(filedir, item),
                                filename: item,
                            });
                        } else if (fs.statSync(path.join(filedir, item)).isDirectory()) {
                            fileDisplayDeep(filedir);
                        }
                    });
                } else {
                    fileDisplayDeep(filedir); // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
                }
            }
            if (isFile) { // 判断是文件
                if (/index\.jsx?/.test(filename)) { // 判断是index.js 或是 index.jsx
                    filesObj.index = filedir;
                    filesObj.filename = filename;
                }
                if (/model\.js/.test(filename)) { // 判断是model.js
                    filesObj.models.push({
                        url: filedir,
                        filename: 'model.js',
                    });
                }
                if (/map\.js/.test(filename)) { // 判断是map.js
                    filesObj.map = filedir;
                    filesObj.mapFilename = 'map.js';
                }
            }
        });
        const urlStack = JSON.parse(JSON.stringify(stack)); // 深拷贝路由栈
        filesObj.baseUrl = urlStack.join('/');
        if (urlStack[0] === 'pages') { // 去除第一层pages文件夹（因为没必要）
            urlStack.shift();
        }
        filesObj.url = urlStack.join('/');
        filesObj.urlName = urlStack.join('-');
        if (filesObj.index) { // 判断是否有页面
            umifiles.push(filesObj);
        }
        stack.pop();
    }
    fileDisplayDeep(filePaths);
    return umifiles;
};

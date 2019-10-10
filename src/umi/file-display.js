const fs = require('fs');
const path = require('path');

module.exports = function fileDisplay(filePaths, ignorePaths) {
    const umifiles = [];
    function fileDisplayDeep(filePath) {
        if (ignorePaths && ignorePaths.includes(filePath)) {
            return;
        }
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
                        filesObj.models.push(path.join(filedir, item));
                    });
                } else if (filename === 'components') { // 判断是components文件夹，遍历该文件夹
                    const components = fs.readdirSync(filedir);
                    components.forEach(item => {
                        filesObj.components.push(path.join(filedir, item));
                    });
                } else {
                    fileDisplayDeep(filedir); // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
                }
            }
            if (isFile) { // 判断是文件
                if (/index\.jsx?/.test(filename)) { // 判断是index.js 或是 index.jsx
                    filesObj.index = filedir;
                }
                if (/model\.js/.test(filename)) { // 判断是model.js
                    filesObj.models.push(filedir);
                }
                if (/map\.js/.test(filename)) { // 判断是map.js
                    filesObj.map = filedir;
                }
            }
        });
        if (filesObj.index) { // 判断是否有页面
            umifiles.push(filesObj);
        }
    }
    fileDisplayDeep(filePaths);
    return umifiles;
};

const fs = require('fs');
const path = require('path');

module.exports = function fileDisplay(filePaths, ignorePaths) {
    const vuefiles = [];
    function fileDisplayDeep(filePath) {
        if (ignorePaths && ignorePaths.includes(filePath)) {
            return;
        }
        const files = fs.readdirSync(filePath);
        files.forEach((filename) => {
            const filedir = path.join(filePath, filename);
            const stats = fs.statSync(filedir);
            const isFile = stats.isFile(); // 是文件
            const isDir = stats.isDirectory(); // 是文件夹
            if (isFile && path.extname(filedir) === '.vue') {
                vuefiles.push({
                    filedir,
                    filename,
                });
            }
            if (isDir) {
                fileDisplayDeep(filedir); // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
        });
    }
    fileDisplayDeep(filePaths);
    return vuefiles;
};

const fs = require('fs');
const path = require('path');

module.exports = function fileDisplay(filePaths, ignorePaths) {
  const umifiles = [];
  const stack = []; // 路由栈
  function fileDisplayDeep(filePath) {
    if (ignorePaths && ignorePaths.includes(filePath)) {
      return;
    }
    const files = fs.readdirSync(filePath);
    files.forEach((filename) => {
      const filedir = path.join(filePath, filename); // 绝对路径
      const stats = fs.statSync(filedir);
      const isFile = stats.isFile(); // 是文件
      const isDir = stats.isDirectory(); // 是文件夹
      if (isDir) {
        fileDisplayDeep(filedir); // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
      }
    });
  }
  fileDisplayDeep(filePaths);
  return umifiles;
};

const fs = require('fs');
const path = require('path');

module.exports = function createVueComponent() {
  const componentPath = path.join(__dirname, '../docs/.vuepress/components');
  const targetPath = path.join(process.cwd(), 'docs/.vuepress/components');

  // 判断是否存在目标文件夹
  const exists = fs.existsSync(targetPath);
  if (!exists) {
    console.log('找不到docs/.vuepress/components文件夹');
    return;
  }

  // 复制文件到目标文件夹
  fs.readdir(componentPath, (err, files) => {
    files.forEach(file => {
      if (path.extname(file) === '.vue') {
        const readable = fs.createReadStream(path.join(componentPath, file));
        const writable = fs.createWriteStream(path.join(targetPath, file));
        readable.pipe(writable);
      }
    });
  });
};

/**
 * 创建注释字符串
 * @param {Object} note
 * @returns {String}
 */
module.exports = function createNote(note) {
    let md = '';
    if (note.intro) {
        md += `> ${note.intro.value}\n\n`;
    }
    if (note.version) {
        md += `${note.version.cn}: ${note.version.value} \n\n`;
    }
    if (note.author) {
        md += `${note.author.cn}: ${note.author.value}\n\n`;
    }
    if (note.url) {
        md += `${note.url.cn}: ${note.url.value}\n\n`;
    }
    if (note.image) {
        md += `${note.image.cn}: ![](${note.image.value})\n\n`;
    }
    if (note.txt) {
        md += `${note.txt.value}\n\n`;
    }
    if (note.param) {
        md += '**参数** \n\n';
        md += `| 参数 | 类型 | 说明
| ---- | ---- | ---- | \n`;
        note.param.forEach(item => {
            md += `| ${item.param} | ${item.type} | ${item.value} \n`;
        });
        md += '\n';
    }
    if (note.returns) {
        md += '**返回值** \n\n';
        md += `| 类型 | 说明
| ---- | ---- | \n`;
        note.returns.forEach(item => {
            md += `| ${item.type} | ${item.value} \n`;
        });
        md += '\n';
    }
    return md;
}
;
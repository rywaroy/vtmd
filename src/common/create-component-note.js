/**
 * 创建注释字符串
 * @param {Object} note
 * @returns {String}
 */
module.exports = function createComponentNote(note) {
    let md = '';
    if (note.intro) {
        md += `::: tip ${note.intro.cn}
${note.intro.value}
:::
`;
    }
    md += '<vtmd-notes \n';
    if (note.version) {
        md += ` version="${note.version.value}"\n`;
        md += ` versionCn="${note.version.cn}"\n`;
    }
    if (note.author) {
        md += ` author="${note.author.value}"\n`;
        md += ` authorCn="${note.author.cn}"\n`;
    }
    if (note.url) {
        md += ` url="${note.url.value}"\n`;
        md += ` urlCn="${note.url.cn}"\n`;
    }
    if (note.image) {
        md += ` image="${note.image.value}"\n`;
        md += ` imageCn="${note.image.cn}"\n`;
    }
    if (note.txt) {
        md += ` txt="${note.txt.value}"\n`;
    }
    md += '/> \n\n';
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
};

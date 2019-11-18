const getNote = require('./get-note');
const createComponentNote = require('./create-component-note');

/**
 * 创建组件方法名
 * @param {String} name - 方法名
 * @param {Arrya} notes
 * @returns {String}
 */
module.exports = function createComponentMethod(name, notes) {
    let md = `<vtmd-head2 content="${name}"/> \n\n`;
    notes.forEach(item => {
        md += '<vtmd-block> \n';
        md += `<vtmd-method-name
  name="${item.name}" \n`;
        if (item.value) {
            const note = getNote(item.value);
            const { param, returns } = note;
            if (param) {
                md += `  params="${param.map(p => p.param).join(', ')}"\n`;
            }
            if (returns) {
                md += `  returns="${returns.map(r => `${r.type} `)}" \n`;
            }
            md += '/> \n\n';
            md += `${createComponentNote(note)} \n\n`;
        } else {
            md += '/> \n\n';
        }
        md += '</vtmd-block>\n\n';
    });
    return md;
};

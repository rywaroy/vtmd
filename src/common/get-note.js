/**
 * 获取注释对象
 * @param {Array} note
 */
module.exports = function getNote(note) {
    const noteObj = {};
    note.forEach(item => {
        if (item.name === 'param' || item.name === 'returns') {
            if (noteObj[item.name]) {
                noteObj[item.name].push(item);
            } else {
                noteObj[item.name] = [item];
            }
        } else {
            noteObj[item.name] = item;
        }
    });
    return noteObj;
};

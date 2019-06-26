const fs = require('fs');
const path = require('path');


module.exports = function create(notes, filename, options) {
  let md;
  const name = filename.substring(0, filename.lastIndexOf('.'));
  if (!options.compontent) {
    md = createMd(notes, name);
  }

  fs.writeFile(`${path.join(process.cwd(), options.output)}/${name}.md`, md, (err) => {
    if (err) throw err;
    console.log(`${filename}写入成功`);
  });
};

/**
 * 创建md字符串
 * @param {Object} notes
 * @returns {String}
 */
function createMd(notes, name) {
  let md = `# ${name} \n\n`;
  if (notes.main) {
    md += createNote(getNote(notes.main));
  }

  if (notes.name) {
    md += `## 组件名： ${notes.name} \n\n`;
  }

  if (notes.props) {
    md += '## props \n\n';
    notes.props.forEach(item => {
      md += `#### ${item.name} \n\n`;
      if (item.type) {
        md += `类型： ${item.type} \n\n`;
      }
      if (item.required) {
        md += `required： ${item.required}\n\n`;
      }
      if (item.value) {
        md += `备注： ${createNote(getNote(item.value))} \n\n`;
      }
    });
  }

  if (notes.data) {
    md += '## data \n\n';
    notes.data.forEach(item => {
      md += `#### ${item.name} \n\n`;
      if (item.type) {
        md += `类型： ${item.type} \n\n`;
      }
      if (item.value) {
        md += `备注： ${createNote(getNote(item.value))}`;
      }
      md += ' \n\n';
    });
  }

  if (notes.methods) {
    md += '## methods \n\n';
    notes.methods.forEach(item => {
      md += `### ${item.name}`;
      if (item.value) {
        const note = getNote(item.value);
        const { param, returns } = note;
        if (param) {
          md += `  (${param.map(p => p.param).join(', ')})`;
        }
        if (returns) {
          md += `  → ${returns.map(r => `{${r.type}} `)}`;
        }
        md += '\n\n';
        md += `${createNote(note)} \n\n`;
      }
    });
  }

  if (notes.computed) {
    md += '## computed \n\n';
    notes.computed.forEach(item => {
      md += `### ${item.name}\n\n`;
      if (item.value) {
        md += `${createNote(getNote(item.value))} \n\n`;
      }
    });
  }

  if (notes.filters) {
    md += '## filters \n\n';
    notes.filters.forEach(item => {
      md += `### ${item.name}\n\n`;
      if (item.value) {
        md += `${createNote(getNote(item.value))} \n\n`;
      }
    });
  }

  if (notes.watch) {
    md += '## watch \n\n';
    notes.watch.forEach(item => {
      md += `### ${item.name}\n\n`;
      if (item.value) {
        md += `${createNote(getNote(item.value))} \n\n`;
      }
    });
  }
  return md;
}

/**
 * 获取注释对象
 * @param {Array} note
 */
function getNote(note) {
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
}

/**
 * 创建注释字符串
 * @param {Object} note
 */
function createNote(note) {
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

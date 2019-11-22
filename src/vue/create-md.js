const fs = require('fs');
const path = require('path');
const getNote = require('../common/get-note');
const createNote = require('../common/create-note');
const createComponentNote = require('../common/create-component-note');
const createComponentMethod = require('../common/create-component-method');

module.exports = function create(notes, filename, options) {
    let md;
    const name = filename.substring(0, filename.lastIndexOf('.'));
    if (!options.compontent) {
        md = createMd(notes, name);
    } else {
        md = createComponentMd(notes, name);
    }

    fs.writeFile(`${path.join(process.cwd(), options.output, `${name}.md`)}`, md, (err) => {
        if (err) throw err;
        console.log(`${filename}转换成功`);
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
        md += createMethod('methods', notes.methods);
    }

    if (notes.computed) {
        md += createMethod('computed', notes.computed);
    }

    if (notes.filters) {
        md += createMethod('filters', notes.filters);
    }

    if (notes.watch) {
        md += createMethod('watch', notes.watch);
    }
    return md;
}

/**
 * 创建方法名
 * @param {String} name - 方法名
 * @param {Arrya} notes
 * @returns {String}
 */
function createMethod(name, notes) {
    let md = `## ${name} \n\n`;
    notes.forEach(item => {
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
    return md;
}

/**
 * 创建组件md字符串
 * @param {Object} notes
 * @returns {String}
 */
function createComponentMd(notes, name) {
    let md = `# ${name} \n\n`;
    if (notes.main) {
        md += createComponentNote(getNote(notes.main));
    }

    if (notes.props) {
        md += '<vtmd-head2 content="props"/> \n\n';
        notes.props.forEach(item => {
            md += `<vtmd-props
  name="${item.name}" \n`;
            if (item.type) {
                md += `  type="${item.type}" \n`;
            }
            if (item.required) {
                md += `  required="${item.required}" \n`;
            }
            md += '/> \n\n';
            if (item.value) {
                md += `${createComponentNote(getNote(item.value))} \n\n`;
            }
        });
    }

    if (notes.data) {
        md += '<vtmd-head2 content="data"/> \n\n';
        notes.data.forEach(item => {
            md += `<vtmd-props
  name="${item.name}" \n`;
            if (item.type) {
                md += `  type="${item.type}" \n`;
            }
            md += '/> \n\n';
            if (item.value) {
                md += `${createComponentNote(getNote(item.value))} \n\n`;
            }
        });
    }

    if (notes.methods) {
        md += createComponentMethod('methods', notes.methods);
    }

    if (notes.computed) {
        md += createComponentMethod('computed', notes.computed);
    }

    if (notes.filters) {
        md += createComponentMethod('filters', notes.filters);
    }

    if (notes.watch) {
        md += createComponentMethod('watch', notes.watch);
    }
    return md;
}

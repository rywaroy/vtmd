const fs = require('fs');
const path = require('path');
const getNote = require('../common/get-note');
const createComponentNote = require('../common/create-component-note');
const createComponentMethod = require('../common/create-component-method');

module.exports = function create(notes, options) {
    let name = notes.urlName;
    if (notes.index.main && getNote(notes.index.main).title) {
        name = getNote(notes.index.main).title.value;
    }

    const md = createMd(notes, name);

    fs.writeFile(`${path.join(process.cwd(), options.output, `${name}.md`)}`, md, (err) => {
        if (err) throw err;
    });
};

/**
 * 创建md字符串
 * @param {Object} notes - 文档对象
 * @param {String} name - 文件名
 */
function createMd(notes, name) {
    let md = `# ${name} \n\n`;

    if (notes.index) {
        md += createIndex(notes.index, notes.filename);
    }

    if (notes.models) {
        md += createModels(notes.models);
    }
    return md;
}

/**
 * 创建index.jsx?md字符串
 * @param {Object} index - index.jsx?文档对象
 * @returns {String} md字符串
 */
function createIndex(index, filename) {
    let md = '';
    if (index.main) {
        md += createComponentNote(getNote(index.main));
    }

    md += `<VtmdFileBox filename="${filename}">`;
    if (index.state) {
        md += createIndexState(index.state);
    }

    if (index.props) {
        md += createIndexProps(index.props);
    }

    if (index.methods) {
        md += createComponentMethod('methods', index.methods);
    }
    md += '</VtmdFileBox>\n\n';

    return md;
}

/**
 * 创建state md字符串
 * @param {Object} state - index.jsx? state文档对象
 * @returns {String} md字符串
 */
function createIndexState(state) {
    let md = '<vtmd-head2 content="state"/> \n\n';
    state.forEach(item => {
        md += '<vtmd-block> \n';
        md += `<vtmd-props
  name="${item.name}" \n`;
        md += '/> \n\n';
        if (item.value) {
            md += `${createComponentNote(getNote(item.value))} \n`;
        }
        md += '</vtmd-block>\n\n';
    });
    return md;
}

/**
 * 创建props md字符串
 * @param {Array} props - index.jsx? props文档对象
 * @returns {String} md字符串
 */
function createIndexProps(props) {
    let md = '<vtmd-head2 content="props"/> \n\n';
    props.forEach(item => {
        md += '<vtmd-block> \n';
        md += `<vtmd-props
  name="${item.name}" \n`;
        if (item.type) {
            md += `  type="${item.type}" \n`;
        }
        if (item.defaultProps) {
            md += `  defaultProps="${item.defaultProps}" \n`;
        }
        md += '/> \n\n';
        if (item.value) {
            md += `${createComponentNote(getNote(item.value))} \n\n`;
        }
        md += '</vtmd-block>\n\n';
    });
    return md;
}

/**
 * 创建models md字符串
 * @param {Object} 创建models - model.js models文档列表
 * @returns {String} md字符串
 */
function createModels(models) {
    let md = '';
    models.forEach(item => {
        md += `<VtmdFileBox filename="${item.filename === 'model.js' ? item.filename : `models/${item.filename}`}">`;

        // 添加namespace
        if (item.ast.namespace) {
            md += `<vtmd-head2 content="${item.ast.namespace}"/> \n\n`;
        }
        md += '</VtmdFileBox>\n\n';
    });
    return md;
}

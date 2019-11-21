const fs = require('fs');
const path = require('path');
const getNote = require('../common/get-note');
const createComponentNote = require('../common/create-component-note');
const createComponentMethod = require('../common/create-component-method');

module.exports = function create(notes, options) {
    let name = notes.urlName;
    if (notes.index.main && getNote(notes.index.main).title) {
        // 如果有title则使用title
        name = getNote(notes.index.main).title.value;

        // 删除原来使用的urlName文件
        const url = `${path.join(process.cwd(), options.output, `${notes.urlName}.md`)}`;
        if (fs.existsSync(url)) {
            fs.unlinkSync(url);
        }
    }

    const md = createMd(notes, name);

    fs.writeFileSync(`${path.join(process.cwd(), options.output, `${name}.md`)}`, md);
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

    if (notes.map) {
        md += createMap(notes.map, notes.mapFilename);
    }

    if (notes.components) {
        md += createComponents(notes.components);
    }
    return md;
}

/**
 * 创建index.jsx?md字符串
 * @param {Object} index - index.jsx?文档对象
 * @param {String} filename - 文件名
 * @returns {String} md字符串
 */
function createIndex(index, filename) {
    let md = '';
    if (index.main && index.main.length > 0) {
        md += createComponentNote(getNote(index.main));
    }

    md += `<vtmd-file-box filename="${filename}">`;
    if (index.state && index.state.length > 0) {
        md += createIndexState(index.state);
    }

    if (index.props && index.props.length > 0) {
        md += createIndexProps(index.props);
    }

    if (index.methods && index.methods.length > 0) {
        md += createComponentMethod('methods', index.methods);
    }
    md += '</vtmd-file-box>\n\n';

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
 * @param {Array} 创建models - model.js models文档列表
 * @returns {String} md字符串
 */
function createModels(models) {
    let md = '';
    models.forEach(item => {
        md += `<vtmd-file-box filename="${item.filename === 'model.js' ? item.filename : `models/${item.filename}`}">`;

        // 添加namespace
        if (item.ast.namespace) {
            md += `<vtmd-head2 content="${item.ast.namespace}" border="0"/> \n\n`;
        }

        // 添加state
        if (item.ast.state) {
            md += createIndexState(item.ast.state);
        }

        // 添加effects
        if (item.ast.effects) {
            md += createComponentMethod('effects', item.ast.effects);
        }
        md += '</vtmd-file-box>\n\n';
    });
    return md;
}

/**
 * 创建map.js md字符串
 * @param {Array} map - map.js文档对象
 * @param {String} filename - 文件名
 * @returns {String} md字符串
 */
function createMap(map, filename) {
    let md = `<vtmd-file-box filename="${filename}"> \n`;
    md += createComponentMethod('map', map);
    md += '</vtmd-file-box>\n\n';
    return md;
}

/**
 * 创建components md字符串
 * @param {Array} components -  components文档列表
 * @returns {String} md字符串
 */
function createComponents(components) {
    let md = '';
    components.forEach(item => {
        md += createIndex(item.ast, `components/${item.filename}`);
    });
    return md;
}

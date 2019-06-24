const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const rules = require('./rules');

module.exports = function astParse(script) {
  const md = {};
  const ast = babelParser.parse(script, {
    sourceType: 'module',
  });
  traverse(ast, {
    ExportDefaultDeclaration(path) {
      // 解析文档介绍注释
      if (path.node.leadingComments) {
        md.main = filterComment(path.node.leadingComments);
      }

      if (path.node.declaration.properties.length > 0) {
        path.node.declaration.properties.forEach(item => {
          // 获取vue组件name
          if (item.key.name === 'name') {
            md.name = item.value.value;
          }

          // 获取vue组件props
          if (item.key.name === 'props') {
            md.props = getProps(item.value);
          }

          // 获取vue组件的data
          if (item.key.name === 'data') {
            md.data = getData(item.body.body[0].argument.properties);
          }

          // 获取vue组件的methods
          if (item.key.name === 'methods') {
            md.methods = getMethods(item.value.properties);
          }
        });
      }
    },
  });
  return md;
};

/**
 * 过滤注释，返回注释解析对象
 * @param {Array} comments - 注释数组
 * @returns {Object}
 */
function filterComment(comments) {
  const commentArray = [];
  comments.forEach(comment => {
    if (comment.type === 'CommentBlock') {
      const cb = filterCommentBlock(comment);
      cb.forEach(line => {
        commentArray.push(filterCommentLine(line));
      });
    }
    if (comment.type === 'CommentLine') {
      commentArray.push(filterCommentLine(comment.value));
    }
  });
  return commentArray;
}

/**
 * 过滤块级注释，返回单行内容
 * @param {String} str - 注释字符串
 * @returns {Array}
 */
function filterCommentBlock(comment) {
  const commentArray = [];
  comment.value.split('\n').forEach(item => {
    // 去除星号、首尾空格 ' * abcd   ' -> 'abcd'
    const str = item.replace(/(^\s*\*\s*)|(\s*$)/, '');

    // 过滤空字符串
    if (str) {
      commentArray.push(str);
    }
  });
  return commentArray;
}

/**
 * 过滤行级注释
 * @param {String} line - 单行注释字符串
 * @returns {Object | String}
 */
function filterCommentLine(line) {
  // 验证是否包含文档规则@，否则直接返回字符串
  if (/@[a-z]+/.test(line)) {
    let flag = false;
    let obj;
    Object.keys(rules).forEach(key => {
      // 遍历规则，查找
      if (line.indexOf(key) > -1) {
        flag = true;
        if (rules[key].simple) {
          obj = {
            name: key,
            value: line.replace(new RegExp(`${key}\\s+`), ''),
          };
        } else {
          // 解析复杂规则如 @param @returns
          obj = filterRules(key, line);
        }
      }
    });
    if (!flag) { // 未匹配规则，则返回字符串
      return {
        name: '@txt',
        value: line,
      };
    }
    return obj;
  }
  return {
    name: '@txt',
    value: line,
  };
}

/**
 * 规则验证
 * @param {String} rules
 * @returns {Object}
 */
function filterRules(rule, line) {
  const type = line.match(/{(.*)}/);
  const obj = {
    name: rule,
    type: type ? type[1] : '', // // 正则配置，获取{}中的参数类型
    value: '',
  };
  if (rule === '@param') {
    // 例子： @params {String | Object} type - 类型
    if (line.indexOf('-') > -1) {
      // 截取'类型'
      obj.value = trimStr(line.split('-')[1]);
    }
    // 截取type
    const param = line.split('-')[0].replace(/{(.*)}/, '').match(/\s+([a-zA-Z0-9]+)\s*/);
    obj.param = param ? param[1] : '';
  }
  if (rule === '@returns') {
    const value = line.match(/}(.+)$/);
    obj.value = value ? trimStr(value[1]) : '';
  }
  return obj;
}

/**
 * 除去首尾空格
 * @param {String} str
 * @returns {String}
 */
function trimStr(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}

/**
 * 获取props内容
 * @param {Object} obj
 * @returns {Object}
 */
function getProps(obj) {
  // 数组形式props
  if (obj.type === 'ArrayExpression') {
    return obj.elements.map(item => ({ name: item.value }));
  }

  // 对象形式props
  if (obj.type === 'ObjectExpression') {
    const props = [];
    for (let i = 0; i < obj.properties.length; i++) {
      const prop = {};
      const propertie = obj.properties[i];
      prop.name = propertie.key.name;
      if (propertie.leadingComments) {
        prop.value = filterComment(propertie.leadingComments);
      }

      // key: String形式
      if (propertie.value.type === 'Identifier') {
        prop.type = propertie.value.name;
      }

      // key: [] 数组形式
      if (propertie.value.type === 'ArrayExpression') {
        prop.type = propertie.value.elements.map(e => e.name).join(' | ');
      }

      // key: {} 对象形式
      if (propertie.value.type === 'ObjectExpression') {
        propertie.value.properties.forEach(item => {
          if (item.key.name === 'type') {
            if (item.value.type === 'ArrayExpression') {
              prop.type = item.value.elements.map(e => e.name).join(' | ');
            } else {
              prop.type = item.value.name;
            }
          }

          if (item.key.name === 'default') {
            // 非函数
            if (item.value.type !== 'ArrowFunctionExpression' && item.value.type !== 'FunctionExpression') {
              prop.default = item.value.value;
            } else {
              prop.default = 'Function Return';
            }
          }

          if (item.key.name === 'required') {
            prop.required = item.value.value;
          }
        });
      }
      props.push(prop);
    }
    return props;
  }
}

/**
 * 获取data内容
 * @param {Array} props
 * @returns {Array}
 */
function getData(props) {
  const arr = [];
  for (let i = 0; i < props.length; i++) {
    const obj = {
      name: props[i].key.name,
    };
    // 最后一项取trailingComments内容
    if (i === props.length - 1) {
      if (props[i].trailingComments) {
        obj.value = filterComment(props[i].trailingComments);
      }
    } else { // 不是最后一项取下一项的leadingComments内容
      if (props[i + 1].leadingComments) {
        obj.value = filterComment(props[i + 1].leadingComments);
      }
    }
    arr.push(obj);
  }
  return arr;
}

/**
 * 获取methods内容
 * @param {Array} props
 * @returns {Array}
 */
function getMethods(props) {
  const arr = [];
  props.forEach(item => {
    const obj = {};
    obj.name = item.key.name;
    if (item.leadingComments) {
      obj.value = filterComment(item.leadingComments);
    }
    arr.push(obj);
  });
  return arr;
}

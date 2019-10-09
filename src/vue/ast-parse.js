const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const rules = require('../rules');

module.exports = function astParse(script) {
  const notes = {};
  const ast = babelParser.parse(script, {
    sourceType: 'module',
  });
  traverse(ast, {
    ExportDefaultDeclaration(path) {
      // 解析文档介绍注释
      if (path.node.leadingComments) {
        notes.main = filterComment(path.node.leadingComments);
      }

      if (path.node.declaration.properties.length > 0) {
        path.node.declaration.properties.forEach(item => {
          // 获取vue组件name
          if (item.key.name === 'name') {
            notes.name = item.value.value;
          }

          // 获取vue组件props
          if (item.key.name === 'props') {
            notes.props = getProps(item.value);
          }

          // 获取vue组件的data
          if (item.key.name === 'data') {
            notes.data = getData(item.body.body[0].argument.properties);
          }

          // 获取vue组件的methods、computed、filters、watch
          if (item.key.name === 'methods' || item.key.name === 'computed' || item.key.name === 'filters' || item.key.name === 'watch') {
            notes[item.key.name] = getMethods(item.value.properties);
          }
        });
      }
    },
  });
  return notes;
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
            value: line.replace(new RegExp(`\\s*${key}\\s+`), ''),
            ...rules[key],
          };
        } else {
          // 解析复杂规则如 @param @returns
          obj = filterRules(key, line);
        }
      }
    });
    if (!flag) { // 未匹配规则，则返回字符串
      return {
        name: 'txt',
        value: line,
        cn: '文本',
      };
    }
    return obj;
  }
  return {
    name: 'txt',
    value: line,
    cn: '文本',
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
    ...rules[rule],
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
    if (props[i].value.type === 'NumericLiteral') {
      obj.type = 'Number';
    }
    if (props[i].value.type === 'StringLiteral') {
      obj.type = 'String';
    }
    if (props[i].value.type === 'ArrayExpression') {
      obj.type = 'Array';
    }
    if (props[i].value.type === 'ObjectExpression') {
      obj.type = 'Object';
      /**
       * @example
       * a: { // 判断这种情况的注释
       *  b: 1,
       * }
       */
      if (props[i].value.properties.length > 0) {
        if (props[i].value.properties[0].leadingComments) {
          obj.value = filterComment(props[i].value.properties[0].leadingComments);
        }
      } else {
        /**
       * @example
       * a: { // 判断这种情况的注释
        *
        * }
        */
        if (props[i].value.innerComments) {
          obj.value = filterComment(props[i].value.innerComments);
        }
      }
    }
    if (props[i].value.type === 'NullLiteral') {
      obj.type = 'Any';
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
    if (item.key) {
      const obj = {};
      obj.name = item.key.name;
      if (item.leadingComments) {
        obj.value = filterComment(item.leadingComments);
      }
      arr.push(obj);
    } else if (item.argument && item.argument.type === 'CallExpression') {
      item.argument.arguments[0].properties.forEach(prop => {
        const objProp = {};
        objProp.name = prop.key.name;
        if (prop.leadingComments) {
          objProp.value = filterComment(prop.leadingComments);
        }
        arr.push(objProp);
      });
    }
  });
  return arr;
}

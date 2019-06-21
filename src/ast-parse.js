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
  console.log(commentArray);
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

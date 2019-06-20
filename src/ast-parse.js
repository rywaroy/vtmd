const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

module.exports = function astParse(script) {
  const ast = babelParser.parse(script, {
    sourceType: 'module',
  });
  traverse(ast, {
    enter(path) {
      if (path.node.leadingComments) {
        console.log(path.node);
        // console.log(path.node.leadingComments);
      }
    },
    // ExportDefaultDeclaration(path) {
    //   console.log(path.node);
    // },
  });
};

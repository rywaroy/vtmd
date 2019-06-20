const babelParser = require('@babel/parser');

module.exports = function astParse(script) {
  babelParser.parse(script, {
    sourceType: 'module',
  });
};

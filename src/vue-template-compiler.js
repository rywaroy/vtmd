const compiler = require('vue-template-compiler');
const fs = require('fs');

module.exports = function vueTemplateCompiler(filePath) {
  const file = fs.readFileSync(filePath, 'utf-8');
  const parsedComponent = compiler.parseComponent(file);
  const scriptContent = parsedComponent.script ? parsedComponent.script.content : '';
  return scriptContent;
};

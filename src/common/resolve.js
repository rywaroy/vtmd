const path = require('path');

const processPath = process.cwd();

module.exports = function resolve(p) {
    if (!p) {
        return p;
    }
    if (Array.isArray(p)) {
        return p.map(item => path.join(processPath, item));
    }
    return path.join(processPath, p);
};

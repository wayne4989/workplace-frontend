let path = require('path');
let rootPath = path.resolve(__dirname, '..');

function root (args): void {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [rootPath].concat(args));
}

exports.root = root;

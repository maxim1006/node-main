const path = require("path");


console.log(__dirname); // /Users/max/projects/node-main/examples/node
console.log(__filename); // /Users/max/projects/node-main/examples/node/path.js


const {root, dir, base, ext, name} = path.parse(__filename);
console.log(root, dir, base, ext, name); // / /Users/max/projects/node-main/examples/node path.js .js path

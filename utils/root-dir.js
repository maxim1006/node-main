const path = require("path");

// так нахожу папку в которой лежит файл отвечающий за начало нашего приложения
// в данном случае app.js
module.exports = path.dirname(process.mainModule.filename);

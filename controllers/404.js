const rootDir = require("../utils/root-dir");
const path = require("path");



const get404 = (req, res, next) => {
    res
        .status(404)
        // полный путь к html
        // .sendFile(path.join(__dirname, "../", "views", "404.html"));
        // путь с использованием главной папки проекта
        // .sendFile(path.join(rootDir, "views", "404.html"));
        // использование template engine
        .render(
            '404',
            {
                pageTitle: 'Page not found'
            }
        );
    // .send('<h1>Page not found</h1>');
};



module.exports = {get404};

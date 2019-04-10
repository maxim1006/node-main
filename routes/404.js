const path = require("path");
const express = require("express");
const router = express.Router();
const rootDir = require("../utils/root-dir");

// path указывать необязательно, по умолчанию '/', так делаю 404 ошибку
router.use((req, res, next) => {
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
});

module.exports = router;

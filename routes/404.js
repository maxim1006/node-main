const path = require("path");
const express = require("express");
const router = express.Router();
const rootDir = require("../utils/root-dir");

// path указывать необязательно, по умолчанию '/', так делаю 404 ошибку
router.use((req, res, next) => {
    res
        .status(404)
        // .sendFile(path.join(__dirname, "../", "views", "404.html"));
        .sendFile(path.join(rootDir, "views", "404.html"));
    // .send('<h1>Page not found</h1>');
});

module.exports = router;

const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require("../utils/root-dir");

const { products } = require('./admin');

router.get('/', (req, res, next) => {
    // express дает возможность сразу отослать html без заголовка // res.setHeader('Content-Type', 'text/html');
    // res.send(`<h1>Shop page</h1>`);

    // так отсылаю файл
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    res.render(
        'shop',
        {
            pageTitle: 'Shop',
            products: products
        }
    );
});

module.exports = router;

// типо админ панель, перенес сюда раньше были app.use, сейчас router.use/get/post отдельный роут
const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require("../utils/root-dir");

router.get('/add-product', (req, res, next) => {
    // res.send(`
    //
    // <h1>Add product page</h1>
    // <form action="/admin/product" method="post">
    //     <input type="text" name="title">
    //     <button type="submit">Add product</button>
    // </form>
    //
    // `);

    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render(
        'add-product',
        {
            pageTitle: 'Add product'
        }
    );
});

const products = [];

// могу использовать app.get(), app.post для реакции только на гет пост эвенты, в отличие от app.use() который будет
// слушать все эвенты
router.post('/add-product', (req, res, next) => {
    console.log(req.body.title); // тут получаю инфо из формы по умолчанию получу undefined так как надо добавить body-parser
    products.push({
        title: req.body.title,
        price: req.body.price || 0
    });
    // redirect is added by express
    res.redirect('/');
});

module.exports = { router, products };

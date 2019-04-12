const {productModel} = require('../models');

const rootDir = require("../utils/root-dir");

const getShop = (req, res, next) => {
    // express дает возможность сразу отослать html без заголовка // res.setHeader('Content-Type', 'text/html');
    // res.send(`<h1>Shop page</h1>`);

    // так отсылаю файл
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

    // так получаю как обычно через fs (с добавление fs-extra)
    // productModel.Product.fetchAll()
    //     .catch(error => console.log(error))
    //     .then((products) => {
    //         res.render(
    //             'shop',
    //             {
    //                 pageTitle: 'Shop',
    //                 products: JSON.parse(products.toString())
    //             }
    //         );
    //     })

    // fs.readJson(...) - добавляет fs-extra
    productModel.Product.fetchAllJson()
        .catch(error => console.log(error))
        .then((products) => {
            res.render(
                'shop/index',
                {
                    path: '/',
                    pageTitle: 'Shop',
                    products: products || []
                }
            );
        })

};

const getProductList = (req, res, next) => {
    productModel.Product.fetchAllJson()
        .catch(error => console.log(error))
        .then((products) => {
            res.render(
                'shop/product-list',
                {
                    path: '/',
                    pageTitle: 'Product list',
                    products: products || []
                }
            );
        })

};

const getProductDetailsById = (req, res, next) => {
    productModel.Product.fetchAllJson()
        .catch(error => console.log(error))
        .then((products) => {
            const product = products.find(product => product.id === req.params.productId);
            res.render(
                'shop/product-details',
                {
                    path: '/product-list',
                    pageTitle: `Product ${product.title}`,
                    product
                }
            );
        })

};

module.exports = {getShop, getProductList, getProductDetailsById};

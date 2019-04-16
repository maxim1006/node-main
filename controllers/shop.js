const {productModel: {Product}, dbProductModel} = require('../models');



const getShop = (req, res, next) => {
    // express дает возможность сразу отослать html без заголовка // res.setHeader('Content-Type', 'text/html');
    // res.send(`<h1>Shop page</h1>`);

    // так отсылаю файл
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

    // так получаю как обычно через fs (с добавление fs-extra)
    // Product.fetchAll()
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
    dbProductModel.Product.fetchAllJson()
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
    dbProductModel.Product.fetchAllJson()
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
    dbProductModel.Product.findById(req.params.id)
        .catch(error => console.log(error))
        .then((product) => {
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

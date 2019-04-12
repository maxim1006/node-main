const rootDir = require('../utils/root-dir');
const {productModel} = require('../models');

const getAddProduct = (req, res, next) => {
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
        'admin/add-product',
        {
            path: '/admin/add-product',
            pageTitle: 'Admin Add product'
        }
    );
};

const getProductList = (req, res, next) => {
    productModel.Product.fetchAllJson()
        .catch(error => console.log("Admin getProductList error ", error))
        .then((products) => {
            res.render(
                'admin/product-list',
                {
                    path: '/admin/product-list',
                    pageTitle: 'Admin Product List',
                    products: products || []
                }
            );
        });
};

const postAddProduct = (req, res, next) => {
    // console.log(req.body.title); // тут получаю инфо из формы по умолчанию получу undefined так как надо добавить body-parser
    const {title, imageUrl, description, price} = req.body;
    const product = new productModel.Product(title, imageUrl, description, price);
    product.save();

    // redirect is added by express
    res.redirect('/');
};

module.exports = {getAddProduct, postAddProduct, getProductList};

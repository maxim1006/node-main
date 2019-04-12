const {productModel} = require('../models');
const path = require('path');
const fs = require('fs-extra');
const utils = require('../utils');

// let products = [];
const currentPath = path.join(utils.rootDir, 'data', 'products.json');



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
            pageTitle: 'Admin Add product',
            product: JSON.stringify({})
        }
    );
};

const getUpdateProduct = async (req, res, next) => {
    // query params in get request
    const queryParams = req.query;
    const {id} = req.params;

    try {
        const products = await productModel.Product.fetchAllJson();

        const product = products.find(item => item.id === id);

        console.log(product);

        res.render(
            'admin/update-product',
            {
                path: '/admin/update-product',
                pageTitle: 'Admin Update product',
                product
            }
        );
    } catch (e) {
        console.log('admin.js getUpdateProduct error ', e);
    }
};

const getProductList = async (req, res, next) => {

    try {
        const products = await productModel.Product.fetchAllJson();

        res.render(
            'admin/product-list',
            {
                path: '/admin/product-list',
                pageTitle: 'Admin Product List',
                products: products || []
            }
        );
    } catch (e) {
        console.log("admin.js getProductList error ", error);
    }
};

const postAddProduct = (req, res, next) => {
    // console.log(req.body.title); // тут получаю инфо из формы по умолчанию получу undefined так как надо добавить body-parser
    const {title, imageUrl, description, price} = req.body;
    const product = new productModel.Product(title, imageUrl, description, price);

    product.save().then((products) => {
        // redirect is added by express
        res.redirect('/');
    });
};

const postUpdateProduct = async (req, res, next) => {
    const {title, imageUrl, description, price, id} = req.body;

    try {
        const products = await productModel.Product.fetchAllJson();
        const updatedProductIndex = products.findIndex(item => item.id === id);

        products[updatedProductIndex] = {title, imageUrl, description, price, id};

        await fs.writeJson(currentPath, products);

        res.redirect('/admin/product-list');

    } catch (e) {
        console.log('admin.js postUpdateProduct error ', e);
    }
};



module.exports = {getAddProduct, postAddProduct, getProductList, getUpdateProduct, postUpdateProduct};

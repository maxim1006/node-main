const {productModel: {Product}, dbProductModel} = require('../models');
const path = require('path');
const fs = require('fs-extra');
// const utils = require('../utils');
const {db: {mongoConnect, getDb, mongodb}} = require('../utils');

// let products = [];
// const productsPath = path.join(utils.rootDir, 'data', 'products.json');
// const cartPath = path.join(utils.rootDir, 'data', 'cart.json');



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
        // const products = await dbProductModel.Product.fetchAllJson();
        //
        // const product = products.find(item => item._id === id);

        const product = await dbProductModel.Product.findById(id);

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
        // file
        // const products = await Product.fetchAllJson();

        // db
        const products = await dbProductModel.Product.fetchAllJson();

        res.render(
            'admin/product-list',
            {
                path: '/admin/product-list',
                pageTitle: 'Admin Product List',
                products: products || []
            }
        );
    } catch (e) {
        res.render(
            'admin/product-list',
            {
                path: '/admin/product-list',
                pageTitle: 'Admin Product List',
                products: []
            }
        );
        console.log("admin.js getProductList error ", error);
    }
};

const postAddProduct = (req, res, next) => {
    // console.log(req.body.title); // тут получаю инфо из формы по умолчанию получу undefined так как надо добавить body-parser
    const {title, imageUrl, description, price} = req.body;
    // через файл
    // const product = new Product(title, imageUrl, description, price);
    // через db
    const product = new dbProductModel.Product(title, imageUrl, description, price);

    product.save().then((products) => {
        // redirect is added by express
        res.redirect('/');
    });
};

const postUpdateProduct = async (req, res, next) => {
    const {title, imageUrl, description, price, id} = req.body;

    try {
        const products = await dbProductModel.Product.fetchAllJson();
        const updatedProductIndex = products.findIndex(item => item._id === id);

        // products[updatedProductIndex] = {title, imageUrl, description, price, id};

        // await fs.writeJson(productsPath, products);

        await getDb().collection('products').updateOne(
            // new mongodb.ObjectId(id) - монго хранит id в спец объекте поэтому при прокидывании id надо обернуть в спец объект.
            { _id: new mongodb.ObjectId(id) },
            {
                $set: {title, imageUrl, description, price},
                $currentDate: { lastModified: true }
            }
        );

        res.redirect('/admin/product-list');

    } catch (e) {
        console.log('admin.js postUpdateProduct error ', e);
    }
};

const deleteProduct = async (req, res, next) => {
    const {id: productId} = req.params;
    const db = getDb();

    try {
        await db.collection('products').deleteOne({_id: new mongodb.ObjectId(productId)});


        /***** remove deleted products from cart *****/
        // const cart = await fs.readJson(cartPath);
        // const deletedProduct = cart.products.find(item => item.id === productId);
        //
        // if (deletedProduct) {
        //     cart.products = cart.products.filter(item => item.id !== productId);
        //     cart.totalPrice = +cart.totalPrice - deletedProduct.quantity * deletedProduct.price;
        //
        //     await fs.writeJson(cartPath, cart);
        // }
        /********************************************/


        res.redirect('/admin/product-list');

    } catch (e) {
        console.log('admin.js deleteProduct error ', e);
    }
};



module.exports = {getAddProduct, postAddProduct, getProductList, getUpdateProduct, postUpdateProduct, deleteProduct};

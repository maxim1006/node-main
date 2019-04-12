const {cartModel} = require('../models');

const getCart = (req, res, next) => {
    cartModel.getCart().then((cart) => {
        res.render(
            'shop/cart',
            {
                path: '/cart',
                pageTitle: 'Your cart',
                cart,
                products: cart.products
            }
        );
    });
};

const addToCart = (req, res, next) => {
    const { productId, price = 10 } = req.body;

    cartModel
        .addProduct(productId, +price)
        .then(() => res.redirect('/cart'));
};

module.exports = {addToCart, getCart};

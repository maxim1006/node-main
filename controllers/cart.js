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

const postAddToCart = (req, res, next) => {
    const { id, price = 10 } = req.body;

    cartModel
        .addProduct(id, +price)
        .then(() => {
            res.redirect('/cart');
        });
};



module.exports = {postAddToCart, getCart};

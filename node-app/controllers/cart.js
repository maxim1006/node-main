const {cartModel, dbCartModel, dbProductModel: {Product}} = require('../models');



const getCart = (req, res, next) => {
    // cartModel.getCart().then((cart) => {
    dbCartModel.Cart.getCart().then((cart) => {
        console.log(cart);
        res.render(
            'shop/cart',
            {
                path: '/cart',
                pageTitle: 'Your cart',
                cart,
                products: cart.products || []
            }
        );
    });
};

const postAddToCart = (req, res, next) => {
    const { id, price = 10 } = req.body;

    // cartModel
    //     .addProduct(id, +price)
    //     .then(() => {
    //         res.redirect('/cart');
    //     });

    Product.findById(id).then((product) => {
        req.user.addToCart(product);
    });
};

const postDeleteFromCart = (req, res, next) => {
    const { id } = req.body;

    cartModel
        .deleteProduct(id)
        .then(() => {
            res.redirect('/cart');
        });
};



module.exports = {postAddToCart, getCart, postDeleteFromCart};

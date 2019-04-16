const express = require("express");
const router = express.Router();
const {cartController} = require('../controllers');



router.get('/cart', cartController.getCart);
router.get('/add-to-cart', cartController.getCart);



router.post('/add-to-cart', cartController.postAddToCart);
router.post('/delete-from-cart', cartController.postDeleteFromCart);



module.exports = router;

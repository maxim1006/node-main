const express = require('express');
const router = express.Router();
const { shopController } = require('../controllers');



router.get('/', shopController.getShop);
router.get('/product-list', shopController.getProductList);
router.get('/product-list/:id', shopController.getProductDetailsById);



module.exports = router;

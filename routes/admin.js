// типо админ панель, перенес сюда раньше были app.use, сейчас router.use/get/post отдельный роут
const path = require('path');
const express = require('express');
const router = express.Router();
const { adminController } = require('../controllers');



router.get('/add-product', adminController.getAddProduct);
router.get('/update-product/:id', adminController.getUpdateProduct);
router.get('/product-list', adminController.getProductList);
router.get('/delete-product/:id', adminController.deleteProduct);



// могу использовать app.get(), app.post для реакции только на гет пост эвенты, в отличие от app.use() который будет
// слушать все эвенты
router.post('/add-product', adminController.postAddProduct);
router.post('/update-product', adminController.postUpdateProduct);



module.exports = { router };

// типо админ панель, перенес сюда раньше были app.use, сейчас router.use/get/post отдельный роут
const path = require('path');
const express = require('express');
const router = express.Router();
const { adminController } = require('../controllers');

router.get('/add-product', adminController.getAddProduct);

router.get('/product-list', adminController.getProductList);

// могу использовать app.get(), app.post для реакции только на гет пост эвенты, в отличие от app.use() который будет
// слушать все эвенты
router.post('/add-product', adminController.postAddProduct);

module.exports = { router };

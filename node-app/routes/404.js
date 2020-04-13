const express = require("express");
const router = express.Router();
const {pageNotFound: pageNotFoundController} = require('../controllers');


// path указывать необязательно, по умолчанию '/', так делаю 404 ошибку
router.use(pageNotFoundController.get404);



module.exports = router;

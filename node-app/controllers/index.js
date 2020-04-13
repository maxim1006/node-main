const adminController = require('./admin');
const shopController  = require('./shop');
// оставил для примера переименования в деструктуризации
const pageNotFound = require('./404');
const cartController = require('./cart');



module.exports = {adminController , shopController , pageNotFound, cartController};

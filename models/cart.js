const fs = require('fs-extra');
const path = require('path');
const utils = require('../utils');
const currentPath = path.join(utils.rootDir, 'data', 'cart.json');
const currentProductPath = path.join(utils.rootDir, 'data', 'products.json');

class Cart {
    static async addProduct(id, price) {
        try {
            let cart = await fs.readJson(currentPath);
            let existingProduct = cart.products.find(product => product.id === id);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                const products = await fs.readJson(currentProductPath);
                const product = products.find(p => p.id === id);

                existingProduct = {id, quantity: 1, ...product};
                cart.products.push(existingProduct);
            }

            cart.totalPrice += price;

            await fs.writeJson(currentPath, cart);

            return cart;

        } catch (err) {
            console.error('Cart addProduct error ', err);
            await fs.writeJson(currentPath, {products: [], totalPrice: 0});
            return Cart.addProduct(id, price);
        }
    }

    static async getCart() {
        try {
            return await fs.readJson(currentPath);
        } catch (err) {
            console.log('Cart getCart error ', err);
            await fs.writeJson(currentPath, {products: [], totalPrice: 0});
            return Cart.getCart();
        }
    }
}

module.exports = Cart;

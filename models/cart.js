const fs = require('fs-extra');
const path = require('path');
const utils = require('../utils');

const cartPath = path.join(utils.rootDir, 'data', 'cart.json');
const productPath = path.join(utils.rootDir, 'data', 'products.json');



class Cart {
    static async addProduct(id, price) {
        try {
            let cart = await fs.readJson(cartPath);
            let existingProduct = cart.products.find(product => product.id === id);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                const products = await fs.readJson(productPath);
                const product = products.find(p => p.id === id);

                existingProduct = {id, quantity: 1, ...product};
                cart.products.push(existingProduct);
            }

            cart.totalPrice = +cart.totalPrice + price;

            await fs.writeJson(cartPath, cart);

            return cart;

        } catch (err) {
            console.error('cart.js addProduct error ', err);
            await fs.writeJson(cartPath, {products: [], totalPrice: 0});
            return Cart.addProduct(id, price);
        }
    }

    static async getCart() {
        try {
            return await fs.readJson(cartPath);
        } catch (err) {
            console.log('cart.js getCart error ', err);
            await fs.writeJson(cartPath, {products: [], totalPrice: 0});
            return Cart.getCart();
        }
    }

    static async deleteProduct(id) {
        try {
            const cart = await fs.readJson(cartPath);

            const deletedProduct = cart.products.find(item => item.id === id);

            cart.products = cart.products.filter(item => item.id !== id);
            cart.totalPrice = +cart.totalPrice - deletedProduct.quantity * deletedProduct.price;

            return await fs.writeJson(cartPath, cart);
        } catch (err) {
            console.log('cart.js deleteProduct error ', err);
        }
    }
}



module.exports = Cart;

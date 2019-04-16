const {db: {mongoConnect, getDb, mongodb}} = require('../utils');

class Cart {
    static async addProduct(id, price) {
        const db = getDb();

        try {
            let cart = await db.collection('cart').find().toArray();

            let existingProduct = cart.products.find(product => product._id === id);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                const product = db.collection('products').find(p => new mongodb.ObjectId(p._id) === id);
                await db.collection('cart').insertOne({quantity: 1, ...product});
            }

            await db.collection('cart').updateOne(
                {
                    $set: { totalPrice: +cart.totalPrice + price },
                    $currentDate: { lastModified: true }
                }
            );

            return cart;

        } catch (err) {
            console.error('cart.js addProduct error ', err);
        }
    }

    static async getCart() {
        const db = getDb();

        try {
            return await db.collection('cart').findOne() || {products: []};
        } catch (err) {
            console.log('cart.js getCart error ', err);
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


module.exports = { Cart };

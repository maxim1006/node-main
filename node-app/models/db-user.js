const {db: {getDb, mongodb}} = require('../utils');

class User {
    constructor({name, email, cart = {products: []}, _id: userId}) {
        this.name = name;
        this.email = email;
        this.cart = cart; // {products: []}
        this.userId = userId;
    }

    async save() {
        const db = getDb();

        return await db.collection('users').insertOne(this);
    }

    addToCart(product) {
        const cartProductIndex = this.cart.products.findIndex(item => item._id === product._id);

    }

    static async findById(id) {
        const db = getDb();

        // если использую findOne, то не нужно писть find().next()
        return await db.collection('users').findOne({
            _id: new mongodb.ObjectId(id)
        });
    }
}

module.exports = { User };

const {db: {mongoConnect, getDb, mongodb}} = require('../utils');

class Product {
    constructor(title, imageUrl, description, price = 0) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    async save() {
        const db = getDb();

        // в монго у меня есть базы данных, коллекции (большие структуры) и документы (структуры по меньше типо объектов)
        // говорю монго с какой коллекцией хочу работать
        // db.collection('products').insertMany(); // принимает [{}]

        try {
            const products = await db.collection('products').insertOne(this); // принимает {}

            console.log(products);

            return products;
        } catch (e) {
            console.log('db.js Product save error');
        }
    }

    static fetchAll() {
        const db = getDb();

        return db.collection('products').find().toArray();
    }

    static fetchAllJson() {
        const db = getDb();

        // find возвращает cursor а не сам объект/массив, поэтому еще надо вызвать .toArray() но это лишь в случае
        // когда знаю что документов немного, в противном случае делаю пагинацию
        return db.collection('products').find().toArray();
    }

    static findById(prodId) {
        const db = getDb();

        // так как find вернет cursor, должен вызвать next() чтобы получить объект
        return db.collection('products').find({_id: new mongodb.ObjectId(prodId)}).next();
    }
}



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
            return await db.collection('cart').find().toArray();
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



module.exports = { Product, Cart };

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

// exports.Product = Product;

module.exports = { Product };

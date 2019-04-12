const fs = require('fs-extra');
const path = require('path');
const utils = require('../utils');

// let products = [];
const currentPath = path.join(utils.rootDir, 'data', 'products.json');



class Product {
    constructor(title, imageUrl, description, price = 0) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    async save() {
        // products.push(this);
        this.id = `product_id_${+new Date()}`;

        try {
            const products = await fs.readJson(currentPath) || [];

            products.push(this);

            await fs.writeJson(currentPath, products, err => console.log(err));

            return products;
        } catch (e) {

            await fs.writeJson(currentPath, [], err => console.log(err));
            this.save();
        }
    }

    static fetchAll() {
        return fs.readFile(currentPath);
    }

    static fetchAllJson() {
        // fs-extra возвращает промис, а если readJson метод, то еще и парсит json
        return fs.readJson(currentPath);
    }
}



module.exports = {Product};

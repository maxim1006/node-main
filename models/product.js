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

    save() {
        // products.push(this);
        this.id = `product_id_${+new Date()}`;

        fs.readFile(currentPath, (error, fileContent) => {
            let products;

            if (error) {
                products = [];
            } else {
                // products doesnt exist
                products = JSON.parse(fileContent);
            }

            products.push(this);

            fs.writeFile(currentPath, JSON.stringify(products), err => console.log(err));
        })
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

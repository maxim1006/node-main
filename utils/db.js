const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
    MongoClient
    // test - название бд, надо еще ввести пароль
        .connect('mongodb+srv://maxim1006:1qaz2wsx@maxcluster-w3f0s.mongodb.net/test?retryWrites=true')
        .catch(error => console.log('MongoClient connection error ', error))
        .then(client => {
            _db = client.db();
            console.log('MongoClient is connected');
            cb(_db);
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
};

module.exports = {mongoConnect, getDb, mongodb};


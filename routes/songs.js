const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let songs;

const initDb = (callback) => {
    if (songs) {
        console.log('Db is already initialized');
        return callback(null, songs);
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            songs = client;
            callback(null, songs);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDatabase = () => {
    if (!songs) {
        throw Error('Database not initialized');
    }
    return songs;
};

module.exports = {
    initDb,
    getDatabase
};
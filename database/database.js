// eslint-disable-next-line no-unused-vars
const { MongoClient, Collection } = require('mongodb');
require('dotenv').config();
const client = new MongoClient(process.env.MONGO_URI);

/**
 * @type {{collections: {[collection: string]: Collection}, connection: null, db: null}}
 */
const database = {
    connection: null,
    db: null,
    collections: null
};

async function mountCollections (db) {
    return {
        users: db.collection('users'),
        product: db.collection('product'),
    };
}

async function GetDatabase () {
    if (!database.connection) {
        database.connection = await client.connect();
        database.db = client.db('projetofinal');
     
    }

    database.collections = await mountCollections(database.db);

    return database;
}

module.exports = { GetDatabase };
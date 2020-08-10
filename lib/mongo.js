const { MongoClient, ObjectID } = require('mongodb')

const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.DB_NAME

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}${config.dbHost}/${DB_NAME}`

class MongoLib {
    constructor() {
        //console.log('MONGO_URI', MONGO_URI)
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
        this.dbName = DB_NAME;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.client.connect(error => {
                if (error) {
                    reject(error);
                }

                console.log('Connected succesfully to mongo');
                resolve(this.client.db(this.dbName));
            });
        });
    }

    getAll(collection, query) {
        return this.connect().then(db => {
            return db.collection(collection).find(query).toArray();
        })
    }

    get(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({ _id: ObjectID(id) });
        });
    }

    create(collection, data) {
        return this.connect()
            .then(db => {
                return db.collection(collection). insertOne(data);
            })
            .then(result => result.insertOne);
    }

    update(collection, id, data) {
        return this.connect()
        .then(db => {
            return db
                .collection(collection)
                .updateOne({ _id: ObjectID(id) }, { $set: data }, { upsert: true });
        })
        .then(result => result.upsertID || id);
    }

    delete(collection, id) {
        return this.connect()
            .then(db => {
                return db
                    .collection(collection).deleteOne({ _id: ObjectID(id) })
            })
            .then(() => id);
    }

}

module.exports = MongoLib;
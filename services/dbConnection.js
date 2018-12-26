const Mongoose = require('mongoose');
const config = require('config');

Mongoose.set('debug', true);
Mongoose.Promise = global.Promise;

const connectToDb = async () => {
    try {
        const {
            user, host, name, port, password,
        } = config.db;

        const connString = `mongodb://${user}:${password}@${host}:${port}/${name}`;

        await Mongoose.connect(connString, { useNewUrlParser: true });

        console.log('Successfully connected to DB');
    } catch (err) {
        console.log('Could not connect to MongoDB, error:', err.message);
    }
};

module.exports = connectToDb;

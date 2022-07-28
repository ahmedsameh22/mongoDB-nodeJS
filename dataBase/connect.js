const MongoClient = require("mongodb").MongoClient;
const myConniction = (cb) => {
  MongoClient.connect(process.env.dbURL, {}, (err, client) => {
    if (err) return cb(err, false);
    const db = client.db(process.env.dbName);
    cb(false, db);
  });
};
module.exports = myConniction;

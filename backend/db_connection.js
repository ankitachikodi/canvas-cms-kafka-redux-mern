// const MongoClient = require('mongodb').MongoClient;
// MongoClient.connect(
//   "mongodb+srv://ankita:ankita@cluster0-teeaq.mongodb.net/test?retryWrites=true",
//   (err, client) => {
//     if (err) {
//       console.log("Connection Failed");
//     } else {
//       console.log("Connection Successful");
//       client.close();
//     }
//   }
// );



// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://ankita:ankita@cluster0-teeaq.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



"use strict";

const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

mongoose.connection.on("connected", () => {
  console.log("MongoDB is connected");
});

mongoose.connection.on("error", err => {
  console.log(`Could not connect to MongoDB because of ${err}`);
  process.exit(-1);
});

mongoose.set("debug", true);

exports.connect = () => {
  var mongoURI =
    "mongodb+srv://ankita:ankita@cluster0-teeaq.mongodb.net/canvas?retryWrites=true";

  mongoose.connect(mongoURI, {
    keepAlive: 1
  });

  return mongoose.connection;
};

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const message = new Schema({
//   name: {
//     type: String
//   },
  sourceEmail: {
    type: String
  },
    destEmail: {
        type: String
    },
 message: {
    type: String
  },
  reply: {
    type: String
  }
});






module.exports = mongoose.model("message", message);

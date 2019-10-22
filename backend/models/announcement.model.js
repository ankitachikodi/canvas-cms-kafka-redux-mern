const mongoose = require('mongoose')
const Schema = mongoose.Schema

const announcement = new Schema({
    //   name: {
    //     type: String
    //   },
    courseID: {
        type: String
    },
    title: {
        type: String
    },
    text: {
        type: String
    },
    postDate: {
        type: String
    }
});






module.exports = mongoose.model("announcement", announcement);

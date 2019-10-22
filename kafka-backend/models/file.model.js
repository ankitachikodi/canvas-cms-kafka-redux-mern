const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const file = new Schema({

    fa_mail: {
        type: String
    },
    courseID: {
        type: String
    },
   file: {
        type: String
    },
    title: {
        type: String
    }

});

module.exports = mongoose.model("files", file);

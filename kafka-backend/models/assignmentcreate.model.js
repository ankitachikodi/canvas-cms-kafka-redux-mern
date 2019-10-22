const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignCreate = new Schema({
  //   name: {
  //     type: String
  //   },
  assignmentID: {
    type: String
  },
  fa_mail: {
    type: String
  },
  courseID: {
    type: String
  },
  assignment_file: {
    type: String
  },
  title: {
    type: String
  },
  deadline: {
    type: Date
  }
});

module.exports = mongoose.model("assignmentcreate", assignCreate);

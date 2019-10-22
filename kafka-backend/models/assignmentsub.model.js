const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignSub = new Schema({
  //   name: {
  //     type: String
  //   },
    assignmentID: {
    type: String
  },
  st_mail: {
    type: String
  },
  courseID: {
    type: String
  },
  assignSubmission: {
    type: String
  },

  grade: {
    type: String
  },
 

});

module.exports = mongoose.model("assignmentsubmissions", assignSub);

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseCreation = new Schema({
  fa_mail:{
    type: String
  },
  type:{
    type: String
  },
  courseID: {
    type: String,
    // required: true,
    // index: true
  },

  courseName: {
    type: String,
    // required: true,
    // index: true
  },
  courseDept: {
    type: String,
    // required: true,
    // index: true
  },
  courseRoom: {
    type: String,
    // required: true,
    // index: true
  },
  courseCapacity: {
    type: String,
    // required: true,
    // index: true
  },
  waitlistCapacity: {
    type: String,
    // required: true,
    // index: true
  },
  courseTerm: {
    type: String,
    // required: true,
    // index: true
  }
});






module.exports = mongoose.model('Courses', CourseCreation)

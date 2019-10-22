const mongoose = require('mongoose')
const Schema = mongoose.Schema

const enrolledCourses = new Schema({
    st_mail: {
        type: String
    },
    type: {
        type: String
    },
    courseID: {
        type: String,
        
    },
    courseName: {
        type: String,
        
    },
    courseDept: {
        type: String,
        
    },
    courseRoom: {
        type: String,
        
    },
    courseCapacity: {
        type: String,
        
    },
    waitlistCapacity: {
        type: String,
        
    },
    courseTerm: {
        type: String,
        
    }
});






module.exports = mongoose.model("EnrolledCourses", enrolledCourses);

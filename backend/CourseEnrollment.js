var db = require("./db_connection.js");
var EnrolledCourses= require("./models/enrolledCourses.model");
var courses = require("./models/courses.model");



let postCourseEnrollment = async (req, res) => {
    console.log("Post Course Enrollment");
    var courseID = req.body.courseID;
    //var email = req.body.email;
    var term = req.body.term;
    //var facultyemail = req.body.facultyemail;
    //console.log("facultyemail: " + facultyemail);
    var stemail = req.body.stemail;
    //console.log("stemail: " + stemail);
    
    var response = {}
    const course = await courses.findOne({courseID}).exec()
    if(course){
        const enrollCourse = {
            "st_mail": stemail,
            //"fa_mail": facultyemail,
           // "type": course.type,
            "courseID": course.courseID,
            "courseName": course.courseName,
            "courseDept": course.courseDept,
            "courseRoom": course.courseRoom,
            "courseCapacity": course.courseCapacity,
            "waitlistCapacity": course.waitlistCapacity,
            "courseTerm": term
        }
        

        const newEnrolledCourse = new EnrolledCourses(enrollCourse);
        await newEnrolledCourse.save()
        response = newEnrolledCourse;
        if (course.courseCapacity > 0){
            course.courseCapacity = course.courseCapacity - 1;
        } else {
            course.waitlistCapacity = course.waitlistCapacity - 1;
        }
        await course.save();
    }
    
    //var query = "INSERT INTO Enrolled_Courses(Email,courseID, Term) VALUES ('" + email + "','" + courseID + "','" +term+  "')";
    // db.con.query(query, function (err, result) {
    //     if (err)
    //         throw err;
    //     console.log(result);
        // updateCourse();
    // });
    // function updateCourse() {
    //     var one = courses.findOneAndUpdate({courseCapacity})
    //     var query4 = "Select courseCapacity from Course where courseID ='" +courseID + "'";
    //     if(query4>0){

    
    //     var query2 = "UPDATE Course SET courseCapacity = courseCapacity-1 WHERE courseID='" + courseID + "'";
    //     db.con.query(query2, function (err, result) {
    //         if (err)
    //             throw err;
    //         console.log('RESULT ', result);
    //     }
    //     )
    // }
    //  else{

       // courses.findOneAndUpdate({'WaitlistNo': WaitlistNo-1})
            // var query5 = "UPDATE Course SET waitlistCapacity = waitlistCapacity-1 WHERE courseID='" + courseID + "'";
            //var query6 = "UPDATE Course SET waitlistNo = waitlistNo+1 WHERE courseID='" +courseID + "'";
            // db.con.query(query5, function (err, result) {
                // if (err)
                    // throw err;
                // console.log('RESULT db ', result);
            // })
            // db.con.query(query6, function (err, result) {
            //     if (err)
            //         throw err;
            //     console.log('RESULT db1', result);
            // })
            
        // }
     
    // }
    //res.writeHead(200, { 'Content-Type': 'application/json' });
    //res.writeHead(200,{'Content-Type': 'text/plain'});
    //res.end(sendResult);

    res.send(response);

}




// let getAvailableCourses =(req, res)=> {

//     courses.findOne({ 'courseID': courseID }, { 'courseCapacity': courseCapacity }, { 'waitlistCapacity': waitlistCapacity }).then(response => {
//         res.writeHead(400, { "Content-Type": "application/json" });
//         console.log(JSON.stringify(response));
//         res.end(JSON.stringify(response));
//     })
//         .catch(error => console.log(error));
    //var query = "SELECT courseID, courseCapacity, waitlistCapacity FROM Course";
    //var resp;
    // db.con.query(query, (err, result) => {
    //     if (err) throw err;
    //     console.log(result);
    //     res.writeHead(400, { 'Content-Type': 'application/json' });
    //     //res.writeHead(200,{'Content-Type': 'text/plain'});
    //     res.end(JSON.stringify(result));
    // });
    
//}

module.exports.postCourseEnrollment = postCourseEnrollment;
//module.exports.getAvailableCourses = getAvailableCourses;
var db = require('./db_connection.js');
var express = require('express');
var bodyparser = require('body-parser');
var cookie = require('cookie-parser');
var session = require('express-session');
var courses = require('./models/courses.model')
//const register = require("./models/register.model");


let postCourseCreation = (req, res) =>{

    console.log("post course    ");
    var type = req.body.type;
    console.log(type);
    var fa_mail = req.body.fa_mail;
    var courseID = req.body.courseID;
    console.log(courseID);
      var courseName = req.body.courseName;
console.log(fa_mail);
    console.log(courseName);
    //    var courseDept = req.body.courseDept;

    //    var  courseRoom = req.body.courseRoom;
    //    var courseCapacity = req.body.courseCapacity;
    //    var waitlistCapacity = req.body.waitlistCapacity;
    //    var courseTerm = req.body.courseTerm;


    
        console.log("Connected at course table!");

        const userData = new courses(req.body);
        console.log("In user Registration", userData);
    const saveData = userData.save().then(response => {
        // localStorage.setItem('courseID', courseID);
        console.log("Login response is:", response);
        res.status(200).json({
            success: true,
            data: {
                fa_mail: saveData.fa_mail,
                courseID: saveData.courseID,
                courseName: saveData.courseName,
                type: saveData.type
         } })})

    //     var sql = "INSERT INTO Courses (courseID, courseName, courseDept, courseRoom, courseCapacity, waitlistCapacity, courseTerm ) VALUES ('" + courseID + "','"  + courseName + "', '" + courseDept + "','"+ courseRoom + "','"  + courseCapacity + "','" + waitlistCapacity + "', '" + courseTerm + "');";
    //     db.con.query(sql, function (err, result) 
    //     {
    //         console.log("abcd")
    //         if (err) {
    //             console.log("Error");
    //             throw err;
    //         }
    //         else {
    //             console.log("Result: " + JSON.stringify(result));
    //             res.writeHead(200, { 'Content-Type': 'application/json' });
    //             res.end("Added a new course");
    //         }

    //     })
    // }

        
}    
let getCourseRegistered = (req, res) => {

    console.log("Get courese registered");
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Rendering Register");
}

module.exports.postCourseCreation = postCourseCreation;
module.exports.getCourseRegistered = getCourseRegistered;
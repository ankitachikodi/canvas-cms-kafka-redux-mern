var db = require('./db_connection.js');
var files = require("../Backend/models/file.model");


let getAllFiles = (req, res) => {

    console.log("GET all files");
    var courseID = req.query.courseID;
    console.log("courseID" ,courseID)
    files.find({ courseID: courseID })
        .then(response => {
            console.log("All Files are --", response);
            //console.log("Response courseid", allCourses.courseID)
            //   console.log("Response fa_mail",allCourses.fa_mail)
            res.writeHead(200, { "Content-Type": "application/json" });
            console.log(JSON.stringify(response));
            res.end(JSON.stringify(response));
        })
        .catch(error => console.log(error));
}






module.exports.getAllFiles = getAllFiles;

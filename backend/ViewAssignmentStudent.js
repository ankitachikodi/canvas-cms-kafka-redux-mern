var db = require('./db_connection.js');
var assgCreate = require("../Backend/models/assignmentcreate.model");


let getViewAssignment = (req, res) => {

    var courseID = req.query.courseID;
   
    assgCreate.find({courseID: courseID})
    .then(response => {
        console.log("All assignments are --", response);
        //console.log("Response courseid", allCourses.courseID)
        //   console.log("Response fa_mail",allCourses.fa_mail)
        res.writeHead(200, { "Content-Type": "application/json" });
        console.log(JSON.stringify(response));
        res.end(JSON.stringify(response));
    })
    .catch(error => console.log(error));
      }
    
     
    //var sql = "Select assignment_file, assignment_id, title, deadline from assg_create where courseID ='" + courseID +"'";
   // console.log(sql);
    //   db.con.query(sql, function (err, result) {
    //     console.log("abcd")
    //     if (err) {
    //         console.log("Error");
    //         throw err;
    //     }
    //     else {
    //         console.log("Result: " + JSON.stringify(result));
    //         // res.writeHead(200, { 'Content-Type': 'application/json' });
    //         res.send(result);
    //     }

    // })




module.exports.getViewAssignment = getViewAssignment;

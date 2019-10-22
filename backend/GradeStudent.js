var db = require('./db_connection');
var assignmentsub = require("./models/assignmentsub.model");
var register = require("./models/register.model");

let getGrades = async (req, res) => {
    console.log(" Get All Grades API ---")
    var courseID = req.query.courseID;
    console.log(courseID);
    users = []
    let Grades = []
    const grades = await assignmentsub.find({ 'courseID': courseID }).exec()

    if (grades.length == 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end();
    }
    else {
        for (var i = 0; i < grades.length; i++) {
            Grades.push(grades[i].grade)
        }

        var grade = []
        for (var i = 0; i < Grades.length; i++) {
            console.log("gggg", Grades[i])
            p = await assignmentsub.findOne({ 'grade': Grades[i] }).exec()
            console.log(p)
            grade.push(p)

        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var data = {
            grade
        }

        res.end(JSON.stringify(data));

    }


}


module.exports.getGrades = getGrades;



// var assgSubmit = require("../Backend/models/assignmentsub.model");


// let getGrades = (req, res) => {


// var Grades = req.query.email;
//    var a = assgSubmit
//         .find({ assignmentID: assignmentID, st_mail: email })
//       .then(response => {
//         console.log("All Grades are --", response);
//         console.log("aaaaaaa",a)

//         res.writeHead(200, { "Content-Type": "application/json" });
//         console.log(JSON.stringify(response));
//         res.end(JSON.stringify(response));
//       })
//       .catch(error => console.log(error));
// }

// module.exports.getGrades = getGrades;
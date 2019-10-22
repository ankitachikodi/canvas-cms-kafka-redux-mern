var db = require("./db_connection");
var courses = require("./models/courses.model");
var register = require("./models/register.model");
var enrolledCourses = require("./models/enrolledCourses.model")


let getMainPage = (req, res) => {
  console.log("Get Main Page");

    console.log("req query all courses" ,req.query);
    var email = req.query.email;
    var type = req.query.type;
    // var allCourses = new courses({
    //     fa_mail: req.query.email,
    //     // courseID: req.query.courseID,
    //     // courseName: req.query.courseName,
    //     type: req.query.type
    //     // ({
    //     //     course: ({
    //     //         courseID: req.query.courseID,
    //     //         courseName: req.query.courseName
    //     //     })
    //     // })
    //     // courseID: req.query.courseID,
    //     // courseName: req.query.courseName
    // })

    // console.log("------ -----" ,allCourses.fa_mail);
    // console.log("CourseID", allCourses.courseID);
    



//   if (type === "Student") {
    // var query1 =
    //   "select c.courseName,c.courseID from Courses c, enroll_wait e where e.st_mail = '" +
    //   email +
    //   "' and e.courseID=c.courseID;";

    // db.con.query(query1, (err, rows) => {
    //   if (err) {
    //     throw err;
    //   } else {
    //     console.log("Rows courses: " + rows);
    //     res.writeHead(200, { "Content-Type": "application/json" });
    //     console.log(JSON.stringify(rows));
    //     res.end(JSON.stringify(rows));
    //   }
    // });
//   } 
    // if (allCourses.type === "Faculty") {

    // var query2 =
    //   "select c.courseName,c.courseID from Courses c where c.fa_mail = '" +
    //   email +
    //   "';";
if(type == 'Faculty'){
          courses
            .find(
                {
                //'userData': course.user,
                // 'courseID' : allCourses.courseID,
                // 'courseName': allCourses.courseName
                fa_mail:email,
                // 'type' : allCourses.type
            
            }
            )
            .then(response => {
              console.log("Course response is:", response);
              //console.log("Response courseid", allCourses.courseID)
            //   console.log("Response fa_mail",allCourses.fa_mail)
                res.writeHead(200, { "Content-Type": "application/json" });
         console.log(JSON.stringify(response));
         res.end(JSON.stringify(response));
            })
            .catch(error => console.log(error));
          }
      else{
  enrolledCourses
    .find(
      {
        //'userData': course.user,
        // 'courseID' : allCourses.courseID,
        // 'courseName': allCourses.courseName
        st_mail: email,
        // 'type' : allCourses.type

      }
    )
    .then(response => {
      console.log("Course response is:", response);
      //console.log("Response courseid", allCourses.courseID)
      //   console.log("Response fa_mail",allCourses.fa_mail)
      res.writeHead(200, { "Content-Type": "application/json" });
      console.log(JSON.stringify(response));
      res.end(JSON.stringify(response));
    })
    .catch(error => console.log(error));
      }

            





//     db.con.query(query2, (err, rows) => {
//       if (err) {
//         throw err;
//       } else {
//         console.log("Rows courses: " + rows);
//         res.writeHead(200, { "Content-Type": "application/json" });
//         console.log(JSON.stringify(rows));
//         res.end(JSON.stringify(rows));
//       }
//     });
  //}
};

module.exports.getMainPage = getMainPage;

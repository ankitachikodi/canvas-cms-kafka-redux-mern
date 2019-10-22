const multer = require("multer");
var db = require("./db_connection.js");
const assgCreate = require("./models/assignmentsub.model");
const assignSunmit = require("./models/assignmentsub.model");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".pdf");
  }
});
var upload = multer({ storage: storage }).single("assignSubmission");

let postSubmitAssignment = (req, res) => {
  console.log("Post Assignment Submit API called ----");
  upload(req, res, function(err) {
    if (err) {
      console.log("Error occured", err);
    }
    console.log("\n\n\n\nbody", req.body);

    console.log("\n\n\n\n\nfile", req.file);

    if (req.file && req.file.path) {
      var assignmentID = req.body.assignmentID;
      var courseID = req.body.courseID;
      
      
      var assignSubmission = req.file.path;
      var st_mail = req.body.st_mail;
      var slicePath = assignSubmission.slice(7);

      const data = {
        assignmentID: assignmentID,
        assignSubmission: slicePath,
        st_mail: st_mail,
        courseID: courseID,
     
      };

      // console.log("This is file info-- " ,data)
      const ac = new assgCreate(data);

      ac.save(function(err) {
        if (err) {
          console.error(rrr);
        }
        console.log("Successfully Saved");
      });

      res.json({
        success: true,
        message: "File Uploaded!"
      });
    }
    // var sql =
    //   "Insert into assg_sub (assignment_file,st_mail,assignment_id) values ('" +
    //   slicePath +
    //   "','" +
    //   st_mail +
    //   "','" + assignmentID +
    //   "')";

    // console.log(sql);
    // db.con.query(sql, function(err, result) {
    //   if (err) throw err;
    //   console.log(result);
    // });
  });
};

let getSubmitttedAssignments = async (req, res) => {
  console.log("getSubmittedAssignments");
  console.log(req.body);

  var assignments = [];
  try {
    const assign = await assignSunmit
      .find({
        courseID: req.body.courseID,
        assignmentID: req.body.assignmentID
      })
      .exec();
    if (assign.length == 0) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("No Assignments");
    } else {
      for (var i = 0; i < assign.length; i++) {
        assignments.push(assign[i]);
      }

      var data = {
        assignments
      };
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(JSON.stringify(data));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Error ");
  }
};
let setAssignmentGrade = async (req, res) => {
  try {
    if (req.body.id && req.body.grade) {
      const id = req.body.id;
      const assign = await assignSunmit.findById(id).exec();
      if(assign){
        assign.grade = req.body.grade;
        await assign.save();
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(JSON.stringify(assign));
        return;
      }
    }
    
    // if (assign.length == 0) {
    //   res.writeHead(400, { 'Content-Type': 'text/plain' });
    //   res.end("No Assignments");
    // }
    // else {
    //   for (var i = 0; i < assign.length; i++) {
    //     assignments.push(assign[i]);
    //   }

    //   var data = {
    //     assignments
    //   };
    //   res.writeHead(200, { "Content-Type": "text/plain" });
    //   res.end(JSON.stringify(data));
    // }
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Error ");
   
  } catch (error) {
    console.log(error);
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Error ");
  }
};

module.exports.postSubmitAssignment = postSubmitAssignment;
module.exports.getSubmitttedAssignments = getSubmitttedAssignments;
module.exports.setAssignmentGrade = setAssignmentGrade;

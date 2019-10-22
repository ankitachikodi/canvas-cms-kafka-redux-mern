const multer = require("multer");
var db = require("./db_connection.js");
var fileUpload = require("./models/file.model");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '.pdf');
    }
});
var upload = multer({ storage: storage }).single('file');

let postFileUpload = (req, res) => {
    console.log("In Post Upload");
    upload(req, res, function (err) {
        if (err) {
            console.log("Error occured", err)
        }
        // console.log(req.files, req.file, req.body);

        console.log("File Name");
        console.log(req.file)

        console.log("File Body");
        console.log(req.body);
        if (req.file && req.file.path) {
            var file = req.file.path;
            var courseID = req.body.courseID;
            var title = req.body.title;
            var slicePath = file.slice(7)
            var fa_mail = req.body.email;

            res.json({
                success: true,
                message: 'File Uploaded!'
            })

      

            const data = {
               
                courseID: courseID,
                file: slicePath,
                title: title,
                fa_mail: fa_mail
            };

         
            const ac = new fileUpload(data);

            ac.save(function (err) {
                if (err) {
                    console.error(rrr)
                }
                console.log("Successfully Saved")
            })
        }

      
    })
}

module.exports.postFileUpload = postFileUpload;






























// let postAssignmentCreation = (req,res) =>{
//     console.log("Inside Post Assignment page");
//     var file = req.body.file;
//     //var courseid = '7879';
//     //var query = "Select courseID from Course where courseID = '" + courseid + "';";
//    // console.log(query);

//     if(file!=''){
//        // var sql = "Insert into Assignment (file) where courseID = '" + courseid + "';";
//         var sql =
//           "Insert into Assignment (AssignmentFile) values '("+file+")' where courseID = '7879';";
//        console.log(sql);

//         db.con.query(sql, function (err, result) {
//             console.log("abcd")
//             if (err) {
//               console.log("Error");
//               throw err;
//             } else {
//               console.log("Result: " + JSON.stringify(result));
//               res.writeHead(200, {
//                 "Content-Type": "application/json"
//               });
//               res.end("Added assignment");
//             }
//         })
//     }

// }

// let getAssignmentCreation = (req, res) => {

//     console.log("Inside get Assignment page");

// }

// module.exports.postAssignmentCreation = postAssignmentCreation;
// module.exports.getssignmentCreation = getAssignmentCreation;
var login = require('./Login.js');
var register = require('./Register.js');
var express = require ('express');
var bodyparser = require ('body-parser');
var cookie = require('cookie-parser');
var session = require('express-session');
var displayProfile = require('./DisplayProfile');
var cors = require('cors');
var course = require('./CourseCreation');
var app = express();
const mongoose = require("./db_connection");
var courseEnrollment = require('./CourseEnrollment');
var assignmentFaculty = require('./AssignmentFaculty');
var viewAssignments = require("./ViewAssignmentStudent");
var assignmentSubmitStudent = require("./AssignmentSubmitStudent");
var editProfile =require ("./EditProfile");
var searchcourses = require("./SearchCourses");
// var viewcourses = require("./EnrollCourses");
var mainPage = require("./getDashboardTiles");
var studentPeople = require("./StudentPeople");
var dropCourse = require("./ViewDropCourses");
var sendMessage = require("./Messages");
var annoucement = require("./Announcement");
var gradeStudent = require("./GradeStudent");
var fileUpload = require("./FileUpload");
var viewFiles = require("./ViewFiles");

// const passport = require("passport");
// const passportJwt = require("passport");


// app.use(passport.initialize());
// app.use(passport.session());
// passport.use("jwt", passportJwt.jwt);


// var jwt = require('jsonwebtoken');


// // Set up middleware
// var requireAuth = passport.authenticate('jwt', { session: false });

// // Initialize passport for use
// app.use(passport.initialize());

// require('./config/passport')(passport);

// app.use(
//   session({
//     secret: "Canvas_secret",
//     resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
//     saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
//     duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
//     activeDuration: 10 * 60 * 1000
//   })
// );


mongoose.connect();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.use(bodyparser.json());
//app.use(bodyparser.urlencoded());
app.use(express.static("public"));

app.use(bodyparser.urlencoded());
app.use(cookie());
app.use(session({
        key:'sessid',
        secret:'myencryptionkey',
        resave:false,
        saveUninitialized:false,
        cookie:{
            path: '/',
            expires: (1*60*1000)        //1 minute
        }

}));


function checkSession(req,res,next)             //to check if session exists
{
    if(!req.session.user || !req.cookies.sessid)    //these values are set after the credentials are accepted. user ID is assigned to session user
    {
        delete req.session.user;    //delete the cookies and session before starting a new one.. so that cookies cannot be misused
        res.clearCookie('sessid');
        res.render('login', {error: "!Session does not exist!"});   //render is used here because redirect cannot accept {error:""} parameters
    }
    else{
        next();     //this will navigate to the next function called after the checkSession function in the get or post method
    }

}
app.post("/fileupload", function (req, res) {
    fileUpload.postFileUpload(req, res);
});

app.get("/files", function(req, res) {
  viewFiles.getAllFiles(req, res);
});
app.post("/addannouncement", function(req, res) {
  annoucement.postAnnouncement(req, res);
});

app.get("/viewannoucement", function (req, res) {
    annoucement.getAnnouncements(req, res);
});

app.post("/getsubmissions",function(req,res){
    assignmentSubmitStudent.getSubmitttedAssignments(req,res);
});

app.get("/getgrades", function(req,res){
    gradeStudent.getGrades(req,res)
})
app.post("/setgrade", function (req, res) {
    assignmentSubmitStudent.setAssignmentGrade(req, res);
});
app.post('/sendmessage', function (req, res) {
    sendMessage.postMessage(req, res);
});

app.post("/sendreply", function(req, res) {
  sendMessage.postSendReply(req, res);
});

app.get("/viewmessage", function(req, res) {
  sendMessage.getMessage(req, res);
});
app.get("/getmessagecount", function (req, res) {
    sendMessage.getMessageCount(req, res);
});
app.get('/login',function(req,res){
    login.getLogin(req,res);
});

app.post('/login',function(req,res){
    login.postLogin(req,res);
});

app.get('/createcourses', function(req,res){
    course.getCourseRegistered(req,res);
});

app.post('/createcourses', function (req, res) {
    course.postCourseCreation(req, res);
});

app.post('/register', function(req,res,next){
    register.postRegister(req,res);
});

app.get('/getallusers', function (req, res, next) {
    register.getAllUsers(req, res);
});


app.get('/register',function(req,res){
    login.getRegister(req,res);
});

app.get('/displayProfile', displayProfile.getDisplayProfile);

// app.get('/availableCourses', function(req,res){
//     courseEnrollment.getAvailableCourses(req, res);
// })
app.post('/EnrollCourses', function(req,res){
    console.log("Inside Post of Enrollment" ,req)
    courseEnrollment.postCourseEnrollment(req,res);
});

app.get('/editProfile', editProfile.getEditProfile);
app.post('/editProfile', editProfile.postEditProfile);


//app.get('/SearchCourses', searchcourses.getSearchCourses);
app.post('/SearchCourses', searchcourses.postSearchCourses);

app.get('/assignmentFaculty', function (req, res) {
    assignmentFaculty.getAssignmentCreation(req, res);
})
app.post("/assignmentFaculty", function(req, res) {
    assignmentFaculty.postAssignmentCreation(req, res);
});

app.post('/upload', assignmentFaculty.postUpload)
//app.post('/EnrollCourses', viewcourses.postEnrollCourses)

app.get('/viewStudents', studentPeople.getDisplayAllStudents)
app.get('/mainPage', mainPage.getMainPage)
app.get('/ViewDropCourses', dropCourse.getViewDropCourses)
app.post("/ViewDropCourses", dropCourse.postViewDropCourses);



module.exports = app;
module.exports = checkSession;



app.get('/viewAssignments', viewAssignments.getViewAssignment)
app.post(
    "/assignmentSubmitStudent",
    assignmentSubmitStudent.postSubmitAssignment
    );
    app.listen(3001);
    console.log("Server Listening on port 3001");
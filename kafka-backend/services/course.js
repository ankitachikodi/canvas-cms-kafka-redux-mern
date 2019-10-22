// var register = require("./models/register.model");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//const secret = require("../../backend/config/keys");
var courses = require("../models/courses.model");
const saltRounds = 10;
//require("../../backend/db/mongoose");

console.log("---------------------INSIDE /SERVICES/LOGIN.js------------------");
function handle_request(msg, callback) {
    console.log("In services login.js handle request:" + JSON.stringify(msg));
    console.log("kafka call...");
    //login logic
    // callback(err,null);

    courses.findOne(
        {
            courseID: msg.courseID,
            courseName: msg.courseName,
            courseCapacity: msg.courseID
        })
}
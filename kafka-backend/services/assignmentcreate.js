// var register = require("./models/register.model");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//const secret = require("../../backend/config/keys");
var assignments = require("../models/assignments.model");
const saltRounds = 10;
//require("../../backend/db/mongoose");

console.log("---------------------INSIDE /SERVICES/LOGIN.js------------------");
function handle_request(msg, callback) {
    console.log("In services login.js handle request:" + JSON.stringify(msg));
    console.log("kafka call...");
    //login logic
    // callback(err,null);

    assignments.save({
        file_name: msg.file_name,
        title: msg.title,

    });
}

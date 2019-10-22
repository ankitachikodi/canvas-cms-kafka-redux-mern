const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
var db = require('./db_connection.js');
var express = require('express');
var bodyparser = require('body-parser');
var cookie = require('cookie-parser');
var session = require('express-session');
// var md5 = require('md5');
var salt = bcrypt.genSaltSync(10);
var kafka = require("../backend/kafka/client");

var indexPage = require('./index.js');
// var register = require("./models/register.model");
// const jwt = require("jsonwebtoken");
// var passport = require("./config/Passport");

//var main = require('./index.js');

let postLogin = (req, res) => {
    console.log("------Inside traveller Login----------");
    var email = req.body.email;
    var password = req.body.password;
    var type = req.body.type;

    console.log("Front end credentials:");
    console.log("email:", email + " password:", password);

    kafka.make_request("login", req.body, function (err, result) {
        console.log("In result");
        console.log(result);

        if (err) {
            console.log("Inside err");
            res.json({
                error: err
            });
        } else {
            console.log("Inside else");
            res.status(200).json({
                success: true,
                data: {
                    email: login.email,
                    type: login.type
                }
            });

            res.end();
        }
    });
}








let getLogin = (req, res) => {
    console.log("Get Login");
}
// let postLogin = (req, res) =>{
//     var password = bcrypt.hash(req.body.password, salt);
// var login = new register({
//     email: req.body.email,
//     type: req.body.type,
//     password: password
    
// });
// console.log("Email in body" ,login.email)



// register.findOne({
//     'email': login.email,
//     'type': login.type
    

// }).then(response => {
//     console.log("Login response is:", response);
//     res.status(200).json({
//         success: true,
//         data: {
//             email: login.email,
//             type: login.type
//         }
//     });
    
// })
//     .catch(error => console.log(error));


    // var email = req.body.email;
    // console.log(email);
    // var password = req.body.password;
    // console.log(password);
    // password = md5(password);
    // console.log(password);
    // var typeOfUser = req.body.type;
    // console.log("Type of user: " + typeOfUser);

    // var getPassword = "Select email,password from " + typeOfUser + " where email = '" + email + "' and password = '" + password + "';"
    // getPassword = "Select email from " + typeOfUser + " where email = '" + email + "';"
    // var sqlResult = [];

    // db.con.query(getPassword, function (err, rows) {
    //     if (err) {
    //         res.send({
    //             success: false
    //         });
    //         return;
    //     }
    //     else {
    //         sqlResult = rows;
    //         console.log(sqlResult);
    //         if (sqlResult.length == 0) {
    //             res.send({
    //                 success: false
    //             });
    //             return;
    //         }
    //         else {
    //             res.json({
    //                 success: true,
    //                 data: {
    //                     email: email,
    //                     type: typeOfUser
    //                 }
    //             });
    //             return;
    //         }
    //     }
    // });





module.exports.getLogin = getLogin;
module.exports.postLogin = postLogin;
var db = require('./db_connection.js');
var express = require('express');
var bodyparser = require('body-parser');
var cookie = require('cookie-parser');
var session = require('express-session');
// var md5 = require('md5');
const bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);

var register = require('./models/register.model')

//var main = require('./index.js');
//app.use(bodyParser.json());

let postRegister = async (req, res) => {
    //var password = req.body.password,
       var password = await bcrypt.hash(req.body.password, salt);
console.log("Hashed Password" ,password);
    const user ={
     name: req.body.name,
     email:  req.body.email,
     password: password,
     type: req.body.type
    }
   

    //if(req.body.email !== register.find({email: req.body.email})){
    const userData = new register(user);
    console.log("In user Registration",userData);
    const saveData = userData.save()
    console.log("User Data ---------",saveData)
    return saveData;

    //}
    // else{
    //     console.log("User already exists");
    // }

    
}

let getAllUsers = async(req,res) =>{
    
    var users = []
    try {
        const user = await register.find().exec();
        if (user.length == 0) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end("No Message");
        }
        else {
            for (var i = 0; i < user.length; i++) {
                users.push(user[i]);
            }

            var data = {
                users : users
            }
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(JSON.stringify(data));
        }
    }
    catch (error) {
        console.log(error)
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end("Error ");

    }
    
    
}
module.exports.postRegister = postRegister;
module.exports.getAllUsers = getAllUsers;


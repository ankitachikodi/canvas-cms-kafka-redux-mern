var login = require('./Login.js');
var index = require('./index.js');
var db = require('./db_connection');
const register = require("./models/register.model");


let getEditProfile = (req, res) => {
    console.log("Get Display Page");
    console.log(req.query.email);
    console.log(req.query.type);

    var user = new register({
        //   email: req.body.email
        email: req.query.email
    });
    console.log("Backend email", user.email)

    // console.log("Logged in user email is" ,user.email)
    // console.log("ID is:", +user._id ,"Email is" +user.email);

    const result = register.findOne({ 'email': user.email }).then(response => {
        // const result = register.findById(req.email.id)
        console.log(" Edit Profile response is:", response);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        console.log(JSON.stringify(result));
        res.end(JSON.stringify(result));

    })
        .catch(error => console.log(error));
    return result

}
//     db.con.query(query, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         console.log(JSON.stringify(result));
//         res.end(JSON.stringify(result));

//     });

// }

let postEditProfile = (req, res) => {
    console.log("Post Display Page");
    console.log(req.body);
    
    var bodyData = new register({
         type : req.body.type,
     email : req.body.email,
     name : req.body.name,
     phoneno : req.body.phoneno,
     aboutme : req.body.aboutme,
     city : req.body.city,
     country : req.body.country,
     school : req.body.school,
     hometown : req.body.hometown,
    })

    const editedData = register.findOneAndUpdate({
        'email': bodyData.email, 'name': bodyData.name,
        'phoneno': bodyData.phoneno,
        'aboutme': bodyData.aboutme,
        'city': bodyData.city,
        'country': bodyData.country,
        'school': bodyData.school,
        'hometown': bodyData.hometown, }).then(response => {
        // const result = register.findById(req.email.id)
        console.log(" Edit Profile response is:", response);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        console.log(JSON.stringify(editedData));
        res.end(JSON.stringify(editedData));

    })
        .catch(error => console.log(error));
    return editedData

}

//     var type = req.body.type;
//     var email = req.body.email;
//     var name = req.body.name;
//     var phoneno = req.body.phoneno;
//     var aboutme = req.body.aboutme;
//     console.log("About Me:" + aboutme);
//     var city = req.body.city;
//     var country = req.body.country;
//     var school = req.body.school;
//     var hometown = req.body.hometown;
//     var query = "update " + type + " set Name='" + name + "', PHONENO='" + phoneno + "', ABOUTME='" + aboutme + "', CITY='" + city + " WHERE Email = '" + email + "'";

//     db.con.query(query, (err, result) => {
//         if (err) {
//             res.send(
//                 {
//                     success : false
//                 }
//             )
//             return;
//         }
//         res.send({
//             success :true
//         });

//     });

 

module.exports.getEditProfile = getEditProfile;
module.exports.postEditProfile = postEditProfile;
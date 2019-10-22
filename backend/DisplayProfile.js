var login = require('./Login.js');
var index = require('./index.js');
var db = require('./db_connection');
const register = require('./models/register.model');

let getDisplayProfile = (req, res) => {
    console.log("Get Display Page");   
   
    

    var user = new register({
    //   email: req.body.email
        email: req.query.email,
        //name: req.query.name

    });
    console.log("Backend email" ,user.email)

    // console.log("Logged in user email is" ,user.email)
    // console.log("ID is:", +user._id ,"Email is" +user.email);

            const result = register.findOne({'email': user.email}).then(response => {
    // const result = register.findById(req.email.id)
                console.log(" response is:", response);
        res.send({
            success: true,
            data: result [0]
        });

    })
        .catch(error => console.log(error));
    return result
        
}
// let getDisplayProfile = (req, res) => {
//     console.log("Get Display Page");    

//     var type = req.query.type;
//     var email = req.query.email;
//     var query = "SELECT * from " + type + " WHERE Email = '" + email + "'";

//     db.con.query(query, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         console.log(JSON.stringify(result));
//         res.send({
//             success : true,
//             data: result[0]
//         });

//     });

// }

let postDisplayProfile = (req, res) => {
    console.log("Post Display Page");
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    res.end("Posted data to edit");

}

module.exports.getDisplayProfile = getDisplayProfile;
module.exports.postDisplayProfile = postDisplayProfile;
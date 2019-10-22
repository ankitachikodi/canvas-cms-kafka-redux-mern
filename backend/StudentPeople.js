var db = require('./db_connection');
var enrolledCourses = require("./models/enrolledCourses.model");
var register = require("./models/register.model");

let getDisplayAllStudents = async(req, res) => {
    console.log(" Get All Students API ---")
    var courseID = req.query.courseID;
    console.log(courseID);
    users=[]
    let Email=[]
    const students = await enrolledCourses.find({'courseID' : courseID}).exec()

    if(students.length==0){
        res.writeHead(400, { 'Content-Type': 'application/json' });
        

            res.end();
    }
    else{
        for (var i = 0; i < students.length; i++) {
            Email.push(students[i].st_mail)
        }

        var people = []
        for (var i = 0; i < Email.length; i++) {
            console.log("gggg", Email[i])
            p = await register.findOne({ 'email': Email[i] }).exec()
            console.log(p)
            people.push(p)

        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var data={
            people
        }

        res.end(JSON.stringify(data));

    }

    





    



    
   // enrolledCourses.find({ courseID: courseID}).then((docs)=>{
    //     if(docs.length==0){
    //         console.log("no data")
    //     }else{
    //         let temp=JSON.stringify(docs)
    //         temp=JSON.parse(temp)
    //         users=[]
    //         for(var i=0;i<docs.length;i++){
    //             users.push(temp[i])
    //         }
    //     }

    //     console.log(temp)
    // }).catch((err)=>{
    //     console.log("error");
    // })
    //console.log("This is user" ,user)
    //const courses = enrolledCourses(user);

    


    // query1 = "select st.Name,st.Email from Student st,enroll_wait en where en.courseID='" + courseID + "' and en.st_mail=st.Email and en.wait_no is null;"
    // db.con.query(query1, (err, rows) => {
    //     if (err) {
    //         throw err;
    //     }
    //     else {
    //         res.writeHead(200, { 'Content-Type': 'application/json' });

    //         console.log(JSON.stringify(rows));
    //         res.end(JSON.stringify(rows));

    //     }
    // })


}


module.exports.getDisplayAllStudents = getDisplayAllStudents;
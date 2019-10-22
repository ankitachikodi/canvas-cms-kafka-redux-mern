var body = require('body-parser');
var cookie = require('cookie-parser');
var session = require('express-session');
var announce = require('./models/announcement.model')

let postAnnouncement = async (req, res) => {
    console.log("Annoucement ------Messages")

    console.log(req.body)

    try {
        const announcement = new announce(req.body);
        const savedUser = await announcement.save()
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("Message sent successfully");

    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end("Error sending Message");

    }

}

let getAnnouncements = async (req, res) => {
    console.log(" Get All Announcements API ---")
    var courseID = req.query.courseID;
    console.log(courseID);
    
    let Annoucement = []
    const announcements1 = await announce
      .find({ courseID: courseID })
      .exec();

    if (announcements1.length == 0) {
      res.writeHead(400, { "Content-Type": "application/json" });

      res.end();
    } else {
        for (var i = 0; i < announcements1.length; i++) {
            Annoucement.push(announcements1[i]);
      }

     
      res.writeHead(200, { "Content-Type": "application/json" });
      var data = {
          Annoucement
      };

      res.end(JSON.stringify(data));
    }
}
module.exports.postAnnouncement = postAnnouncement;
module.exports.getAnnouncements = getAnnouncements;




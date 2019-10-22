var body= require('body-parser');
var cookie = require('cookie-parser');
var session = require('express-session');
var msgModel = require('./models/messages.model')
//const register = require("./models/register.model");


let postMessage = async(req, res) => {
    console.log("Sent Messages")

    console.log(req.body)

    try {
        const newMessage = new msgModel(req.body);
        const savedUser = await newMessage.save()
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("Message sent successfully");

    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end("Error sending Message");

    }

}

let postSendReply = async (req, res) => {
    console.log("Send Reply")
   
    console.log(req.body.id)
    id = req.body.id;
    try {
        const reply = await msgModel.findByIdAndUpdate( id, { reply: req.body.reply}).exec()
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("Reply sent successfully");

    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end("Error sending Reply");

    }

}

let getMessageCount = async (req, res) => {
    destEmail = req.query.destEmail;
    console.log(typeof (destEmail))
    var messages = []
    try {
        var data = {
            count: 0
        }
        const msg = await msgModel.find({ 'destEmail': destEmail }).exec();
        if (msg.length == 0) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify(data));
        }
        else {
           data.count = msg.length;
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

let getMessage = async(req, res) => {

    destEmail = req.query.destEmail;
    console.log(typeof(destEmail))
    var messages = []
    try{
        const msg = await msgModel.find({'destEmail':destEmail}).exec();
    if(msg.length==0){
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end("No Message");
    }
    else{
        for (var i = 0; i < msg.length; i++) {
          messages.push(msg[i]);
        }
         
        var data = {
            message:messages
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
};



module.exports.postMessage = postMessage;
module.exports.postSendReply = postSendReply;
module.exports.getMessageCount = getMessageCount;

module.exports.getMessage = getMessage;
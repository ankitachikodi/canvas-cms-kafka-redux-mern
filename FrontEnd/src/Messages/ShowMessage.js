import React, { Component } from "react";
import axios from "axios";

class ShowMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reply: ""
            }

        this.sendReply=this.sendReply.bind(this);
        this.setReply = this.setReply.bind(this);

    }

    setReply(e) {
        console.log("here",e.target.value)
        this.setState({
            reply:e.target.value
        })

    }
    sendReply(e){
        e.preventDefault();
        console.log("khjbjjbj",this.props.message);
        var data={
            id:this.props.message._id,
            reply:this.state.reply
        }
        axios.post("http://localhost:3001/sendreply",data).then(response => {

        })
            .catch(error => { });;
       
    }
    
    render() {
        let editable=false;
        let replyButton=null
       
        editable = this.props.message.reply.length !== 0 ? <input type="text" class="form-control" onChange={this.setReply} value={this.props.message.reply} disabled /> : <input type="text" class="form-control" onChange={this.setReply} />
        replyButton = this.props.message.reply.length !== 0 ? null : <button type="button" class="btn btn-primary" onClick={this.sendReply} >Reply</button>
        
        return (
          <div style={{ align: "left" }}>
            <div class="container1">
            <div class = "form-group">
        
              <p>{this.props.message.message}</p>
              <span class="time-right">
                
            {editable}
              </span>
              <span class="time-right">
                
                            {replyButton}         
              </span>
              </div>
            </div>
          </div>
        );
    }
}
export default ShowMessage;

import React, { Component } from "react";
import axios from "axios";
import ShowMessage from "./ShowMessage";

class CreateMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages:"",
            status:null,
            users:[],
            email:""
            
        }
        this.setMessage = this.setMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.setEmail = this.setEmail.bind(this);

    }
    setMessage(e){
        this.setState({
            
            messages: e.target.value
        });
    }

    setEmail(e){
        this.setState({

            email: e.target.value


        });
    }

    componentDidMount(){
        axios.get("http://localhost:3001/getallusers").then((response) => {
            console.log("All users",response.data.users);

            this.setState({
              status: 200,
              users: response.data.users,
              
            });

        }).catch((error) => {
            this.setState({
                status: 400
            })
        });
    }

    sendMessage(e) {
        e.preventDefault();
        var data = {
          sourceEmail:localStorage.getItem('email'),
          destEmail:this.state.email,
        message:this.state.messages,
        reply:""

        };
       

            axios.post("http://localhost:3001/sendmessage", data).then((response) => {
            console.log("Message Data ", response.data.message);

            

        }).catch((error) => {
            
        });  
    }


    
    render() {
        let filteredLists=null;
        return (<div>
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Send Message:</label>
                    <input type="text" class="form-control" placeholder="Enter destination Email" onChange={this.setEmail} />
                    <input type="text" class="form-control"   placeholder="Enter message to be sent" onChange={this.setMessage}/>
                        
  </div>
                    
                            <button type="submit" class="btn btn-primary" onClick={this.sendMessage}>Send Message</button>
</form>
        </div>)
    }
}
export default CreateMessage;

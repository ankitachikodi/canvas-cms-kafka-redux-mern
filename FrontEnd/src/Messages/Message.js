import React, { Component } from "react";
import axios from "axios";
import ShowMessage from "./ShowMessage";

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: null,
            status: null,
            dataavailable:null,
            reply: ""

        }
        
    

    }

    componentDidMount() {
        console.log("This is local stored email",localStorage.getItem('email') )
        axios.get('http://localhost:3001/viewmessage?destEmail', { params: { destEmail: localStorage.getItem('email')}} )
            .then((response) => {
                console.log("Message Data ",response.data.message);

                this.setState({
                    status: 200,
                    messages: response.data.message,


                });

            }).catch((error)=>{
                this.setState({
                    status: 400})
            });
    }
render(){
    let details = null
    if(this.state.status == 200 && this.state.messages != null){
        details = this.state.messages.map (x => {
            console.log("xxxx" ,x)
            return(
                <ShowMessage message = {x}></ShowMessage>
            )
        })
    }

return(<div>
    {details}
</div>)
}
}
export default Message;

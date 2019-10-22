import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import lib from '../isLogin'
class CreateAnnouncement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseID: ((this.props.match || {}).params || {}).courseId,

      // userType: lib.getUser().type,
      // studentName: "",
      // studentMail: lib.getUser().email,
      // studentListArray: [{
      //     Title: 'New Announcement',
      //     Message: 'Hi All',
      //     Date : '03/16/2019'

      // },{
      //     Title: 'Announcement 2',
      //     Message: 'Quiz scheduled on Date 04/23/2019',
      //     Date: '02/22/2019'

      // }],
      // searchCompleted: false,
      title: "",
      text: "",

      status: null
    };

    this.setTitle = this.setTitle.bind(this);

    this.setText = this.setText.bind(this);

    this.sendAnnouncement = this.sendAnnouncement.bind(this);
  }

  setText(e) {
    this.setState({
      text: e.target.value
    });
  }
  setTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  sendAnnouncement(e){
      e.preventDefault();

      var data={
          courseID:this.state.courseID,
          title:this.state.title,
          text: this.state.text,
          postDate:new Date().toDateString()
      }

      axios
        .post("http://localhost:3001/addannouncement",data)
        .then(response => {
          alert("announcement posted");
        })
        .catch(error => {});


  }

  render() {
    return (
      <div>
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Create Announcement:</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter Title"
              onChange={this.setTitle}
            />
            <input
              type="textarea"
              class="form-control"
              placeholder="Enter text"
              onChange={this.setText}
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary"
            onClick={this.sendAnnouncement}
          >
            Craete
          </button>
        </form>
      </div>
    );
  }
}

export default CreateAnnouncement;
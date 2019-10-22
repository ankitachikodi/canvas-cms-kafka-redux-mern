import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import lib from '../isLogin'
class Announcement extends Component {
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
            ann:[],
            status:null

        }

    }
    componentDidMount() {
        
        axios
          .get("http://localhost:3001/viewannoucement", {
            params: { courseID: this.state.courseID }
          })
          .then(response => {
            console.log("Message Data -----------", response);

            this.setState({
              status: 200,
                ann: response.data.Annoucement
            });
          })
          .catch(error => {
            this.setState({
              status: 400
            });
          });
    }
  


    

    render() {
        let faculty=null
  faculty =
    localStorage.getItem("type") === "Faculty" ? (
      <button
        type="button"
        className="btn btn-primary btn-sm"
        style={{ alignContent: "center" }}
      >
        <Link to={`/courses/${this.state.courseID}/createannouncement`}>
          Create Annoucement
        </Link>
      </button>
    ) : null;
        let studentList = this.state.ann.map(searchResult => {
          return (
            <tr>
              <td>
                <p>{searchResult.title}</p>
              </td>
              <td>
                <p>{searchResult.text}</p>
              </td>
              <td>
                <p>{searchResult.postDate}</p>
              </td>
            </tr>
          );
        });

        return (
            <div class="container" >
            <h3>Announcements</h3>
            {faculty}
            <table class="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Message</th>
                  <th>Posted Date</th>
                </tr>
              </thead>
              <tbody>{studentList}</tbody>
            </table>
          </div>
        );
    }
}

export default Announcement;
import React from 'react'
const axios = require("axios");

class IndividualAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grade: 0,
      status:null
    };

    this.setGrade = this.setGrade.bind(this);
    this.submitGrade = this.submitGrade.bind(this);
  }
  submitGrade(e){
      e.preventDefault()
    var data={
        grade:this.state.grade,
        id:this.props.data._id
    }
      axios.post("http://localhost:3001/setgrade", data).then(response => {
          console.log("All11 Assignments", response.data.assignments)
          this.setState({
              
              status: 200
          })
      })
          .catch(error => {
              this.setState({

                  status: 400
              })
          });;
  }
  setGrade(e) {
    this.setState({
      grade: e.target.value
    });
  }

  render() {
    console.log("-------------", this.props.data);

    return (
      <tr>
        <td>{this.props.data.st_mail}</td>

        <td />

        <a
          href={`http://localhost:3001/${this.props.data.assignSubmission}`}
          target="_blank"
        >
        
          {this.props.data.assignmentID}
        </a>

        <td />
        <td>
          <input
            type="text"
            placeholder="Enter the grade"
            onChange={this.setGrade}
          />
        </td>

        <td>
          <button onClick={this.submitGrade}>Submit Grade</button>
        </td>
      </tr>
    );
  }
}

export default IndividualAssignment;

























































// import React, { Component } from "react";
// import axios from "axios";
// import { read } from "fs";

// export default class AssignmentFaculty extends Component 
// {
//     constructor(props) {
//         super(props);
//         this.state={
//           //  assignmentFile: '',
//             //courseID: '7879',
//             //cookie.load('courseID'),
//             assignment: ''
//         }
//     }

// selectedFileHandler = e => {
// //    this.setState({
// //        file:e.target.files
// //     })
//     let files = e.target.files;
//     let reader = new FileReader();
//     reader.readAsDataURL(files[0]);
//     reader.onload = (e) =>{

//         const url = 'http://localhost:3001/assignmentFaculty';
//         const data = {file: e.target.files}

//         return (axios.post(url, data)
//         .then(response => console.warn("resul", response)));
//     }
// }


// // onAssignmentCreation = e =>{
// //     e.preventDefault();
// //     const assignmentData ={
// //         courseID: this.state.courseID,
// //       //  assignmentFile: this.assignmentFile,
// //         selectedFile: this.selectedFile
// //     };
// //     axios.post('http://localhost:3001/assignmentFaculty', assignmentData)
// //         .then(response => 
// //             {
// //             console.log(response.body);
// //             console.log("Status Code : ", response.status);
// //             if (response.status === 200) 
// //             {
// //                 this.setState({
// //                     authFlag: true,
// //                     assignmentAdded: true
// //                 })
// //             } else 
// //             {
// //                 this.setState({
// //                     authFlag: false,
// //                     assignmentAdded: false
// //                 })
// //             }
// //         });
// // }


// render() 
// {
//     return(
//     <div>
//         <input type="file" onChange = {this.selectedFileHandler} />
//         <button onClick={this.onAssignmentCreation}> Upload </button> 
//     </div>
//     ); 
// }
// }

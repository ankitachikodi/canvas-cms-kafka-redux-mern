import IndividualAssignments from "./IndividualAssignments";
import React from 'react'
const axios = require("axios");

class ShowSubmissions extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            assignments: null,
            status: null
        };
        
    }

    componentDidMount(){
        console.log("In Did Mount");
        console.log("courseID", this.props.match.params.assignmentId);
        var data={
            assignmentID: this.props.match.params.assignmentId,
            courseID: ((this.props.match || {}).params || {}).courseId
        }
        axios.post("http://localhost:3001/getsubmissions", data).then(response => {
            console.log("All11 Assignments", response.data.assignments)
            this.setState({
                assignments:response.data.assignments,
                status:200
            })
        })
            .catch(error => {
                this.setState({
                    
                    status: 400
                })
             });;
    }
    

    render() {
        let details = null
        if (this.state.status == 200 && this.state.assignments!= null) {
            details = this.state.assignments.map(x => {
              console.log("xxxx", x);
                return <IndividualAssignments data={x} />;
            });
        }


        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>
                            Email
                            </th>
                        
                            <th>
                            View Assignment
                            </th>
                            <th>
                            Grade
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {details}

                    </tbody>
                </table>

            </div>
        );
    }
}

export default ShowSubmissions;

























































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

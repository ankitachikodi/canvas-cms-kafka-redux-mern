import lib from './../isLogin';
import React from 'react'
const axios = require("axios");
class StudentSubmitAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      st_mail: lib.getUser().email,
      assignmentID: this.props.match.params.assignmentId,
      courseID:""
      //courseID: '7879',

      // title: '',
      // deadline: ''
      // message: 'Assignment 1'
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    //this.onChangeText = this.onChangeText.bind(this);
  }
  
  onFormSubmit(e) {
    console.log("Here");
    e.preventDefault();
    const formData = new FormData();
    console.log(this.state)
    formData.append("assignSubmission", this.state.file);
    formData.append("courseID" , this.state.courseID);
    console.log("props courseID" ,this.props.match.params.courseID);
    formData.append("st_mail", this.state.st_mail);
    formData.append("title", this.state.title);
    formData.append("deadline", this.state.deadline);
    formData.append("assignmentID", this.state.assignmentID);
    console.log("assg_id: " + this.state.assignmentID);
    const config = {
      headers: {"content-type": "multipart/form-data"},
        assg_id: this.props.assignmentID,
        courseID: this.props.match.params.courseID
      
    };
    console.log("Config: "+config.assg_id);
    //const data = {assignmentID:this.state.assignmentID};
    axios
        .post("http://localhost:3001/assignmentSubmitStudent", formData, config)
      .then(response => {
        alert("The file is successfully uploaded");
      })
      .catch(error => {});
  }

  
  onChange(e) {
    this.setState({ file: e.target.files[0] ,
      courseID: ((this.props.match || {}).params || {}).courseId});
    this.onFormSubmit(e);
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>Assignment Submit</h1>
        {/* <input type="date" onChange={this.onChangeText} name='deadline' />
                <input type="text" onChange={this.onChangeText} name='title' /> */}

        <input type="file" name="assignSubmission" onChange={this.onChange} />
        <br />
        <button  type="button" class="btn btn-primary">Upload</button>
      </form>
    );
  }
}

export default StudentSubmitAssignment;

















































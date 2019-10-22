import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import cookie2 from 'react-cookies';
import { Redirect } from 'react-router';
import DisplayCourses from './ViewCourses';
import $ from "jquery"; 
import { S_IFBLK } from 'constants';

//Define a Login Component
class SearchCourses extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            stemail: cookie.load('email'),
            //  type: cookie2.load('type'),
            courseNumber: "",
            courseName: "",
            term: "",
            courseID: "",
            category: "",
            categoryVal: '',
            isChanged: false,
            selectedVal: "",
            searchCompleted: false,
            searchResults: [],
            isEnrolled: '',
            isEnrolledAlready: '',
            waitListPosition: "",
            isWaitlisted: "",
            viewCourses: "",
            searchCourses: ""

        }
        //Bind the handlers to this class
        // this.categorySelect = this.categorySelect.bind(this);
    }


    categorySelect = (e) => {
        console.log("Inside Category select");
        this.setState({
            category: e.target.name,
            categoryVal: e.target.value
        });
        console.log("Category: " + this.state.category + " categoryval: " + this.state.categoryVal);

    }

    viewEnrolledHandler = (e) => {
        this.setState({
            viewCourses: true
        })
    }

    search1Handler = (e) => {
        this.setState({ searchResults: [] });
        const data = {
            category: this.state.category,
            categoryVal: this.state.categoryVal,
            selectedVal: this.state.selectedVal
        }
        console.log("Data: " + JSON.stringify(data,null,2));
        //console.log("Category: " + data.category + " categoryval: " + data.categoryVal);
        axios.post("http://localhost:3001/SearchCourses", data).then(response => {
            console.log("inside axios of Seacrh Courses");
            console.log("Status Code : ", response.status);
            console.log("response Data:", response.data);
            if (response.status === 200) {


                let courseNumber = $("select[name='cno_category'] option:selected").val();
                let courseNameText1 = $("input[name='cno_input']").val();
                courseNameText1 = courseNameText1.toLowerCase();
                let courseName = $(
                  "select[name='cname_category'] option:selected"
                ).val();
                let courseNameText2 = $(
                  "input[name='cname_input']"
                ).val();
                courseNameText2 = courseNameText2.toLowerCase();
                
                let courseTerm = $("select[name='c_term'] option:selected").val();
                //let courseNameText = $("input[name='cno_input'").val();

                
                console.log(response.data);

                let result_data = [];
                if(response.data){
                    
                    if (courseNumber && courseNumber != "isSelected") {

                        //Course number search
                        for (let i = 0; i < response["data"].length; i++) {
                            let temp = response["data"][i];
                            if (courseNumber=="like"){
                                if (temp["courseID"].toLowerCase().indexOf(courseNameText1)!=-1){
                                    result_data.push(temp);
                                }
                            }
                            else if(courseNumber==">"){
                                if (temp["courseID"].toLowerCase() >= courseNameText1) {
                                    result_data.push(temp);
                                }
                            }
                            else if(courseNumber=="<"){
                                if (temp["courseID"].toLowerCase() <= courseNameText1) {
                                    result_data.push(temp);
                                }
                            }
                            else if(courseNumber=="="){
                                if (temp["courseID"].toLowerCase() == courseNameText1) {
                                    result_data.push(temp);
                                }
                            }
                        }
                    }
                    else if (courseName && courseName != "isSelected") {
                        
                        //Course name search
                        for (let i = 0; i < response["data"].length; i++) {
                            let temp = response["data"][i];
                            if (courseName == "like") {
                                if (temp["courseName"].toLowerCase().indexOf(courseNameText2) != -1) {
                                    result_data.push(temp);
                                }
                            }
                            else if (courseName == "=") {
                                if (temp["courseName"].toLowerCase() == courseNameText2) {
                                    result_data.push(temp);
                                }
                            }
                        }
                    }
                    else if (courseTerm && courseTerm != "isSelected") {

                        //Course name search
                        for (let i = 0; i < response["data"].length; i++) {
                            let temp = response["data"][i];
                            if (temp["courseTerm"].toLowerCase() == courseTerm.toLowerCase()) {
                                if (temp["courseName"].indexOf(courseNameText2) != -1) {
                                    result_data.push(temp);
                                }
                            }
                            
                        }
                    }
                    
                }
                
                console.log(result_data);

                this.setState({
                    searchCompleted: true,
                    searchResults: result_data//this.state.searchResults.concat(response.data)
                });

            }
            else {
                this.setState({
                    searchCompleted: false
                });
            }
        });
    }


    render() {
        let redirectVar1 = null;
        if (this.state.searchCompleted === true) {
            //   redirectVar1 = <Redirect to= "/DisplayCourses" search={this.props.search}/>;
            console.log("Redirect to DisplayCourses");

            redirectVar1 = <DisplayCourses searchResults={this.state.searchResults} />
        }
        return (
            <div>
                <div class="container">
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <h2>Search Courses</h2>
                            </div>

                            {/*<div class="form-group">*/}
                            <table align="center">
                                <tr>
                                    <td align="left"><label>Course Number</label></td>
                                    <td align="left">
                                        <select name="cno_category" >
                                            <option value="isSelected"  >Select</option>
                                            <option value="like">contains</option>
                                            <option value=">"> greater than or equal to </option>
                                            <option value="<"> less than or equal to </option>
                                            <option value="="> is exactly </option>
                                        </select></td>
                                    <td align="left"><input name="cno_input" onChange={(e) => this.setState({ selectedVal: e.target.value })} type="text" placeholder="courseNumber"></input></td>
                                    <td align="left">
                                        <button onClick={this.search1Handler} type="button" class="btn btn-primary btn-sm"> Search </button><br />
                                    </td>
                                </tr>
                                <br />
                                <tr>
                                    <td align="left"><label>Course Name</label></td>
                                    <td align="left">
                                        <select name="cname_category" >
                                            <option value="isSelected" >Select</option>
                                            <option value="like"> contains </option>
                                            <option value="="> is exactly </option>
                                        </select></td>
                                    <td align="left"><input name="cname_input" onChange={(e) => this.setState({ selectedVal: e.target.value })} type="text" placeholder="courseName"></input></td>

                                    <td align="left">
                                        <button onClick={this.search1Handler} type="button" class="btn btn-primary btn-sm"> Search </button><br />
                                    </td>
                                </tr><br></br>
                                <tr>
                                    <td align="left"><label>Course Term</label></td>
                                    <td align="left">
                                        <select name="c_term" >
                                            <option value="isSelected" >Select</option>
                                            <option value="fall"> Fall </option>
                                            <option value="spring"> Spring</option>
                                        </select>
                                    </td>
                                    <td></td>
                                    <td align="right">
                                        <button onClick={this.search1Handler} type="button" class="btn btn-primary btn-sm"> Search </button><br />
                                    </td>
                                </tr>
                                <tr>
                                </tr>
                            </table>

                        </div>
                    </div>
                </div>
                {redirectVar1}
            </div>
        )
    }
}
//export Login Component
export default SearchCourses;
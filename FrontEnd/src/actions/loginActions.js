import axios from 'axios';
//import cookie from 'react-cookies'

export const LOGIN = "login_success";
export const LOGIN_ERROR = "login_error";
//traveler login action
function getSuccess(response) {
    console.log("Response inside login action" , response)
    return {
        type: LOGIN,
        payload: response
    }
}


function getError(response) {
    return {
      type: LOGIN_ERROR,
      payload: response
    };
}
function login(values) {
    console.log("Login Actions Values",values)
    //middleware call
    //receive response from backend
    return function (dispatch) {
        
        
        axios.post('http://localhost:3001/login', values, { withCredentials: true }).then(res => {
            dispatch(
                getSuccess(res)
            )
        }).catch(error => {
            dispatch(getError(error))
        })
    }


}

export default login;

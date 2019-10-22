import axios from 'axios';
//import cookie from 'react-cookies'

export const PROFILE = "profile_success";
export const PROFILE_ERROR = "profile_error";
//traveler PROFILE action
function getSuccess(response) {
    return {
        type: PROFILE,
        payload: response
    }
}


function getError(response) {
    return {
        type: PROFILE_ERROR,
        payload: response
    };
}
function EditProfileAction(values) {
    console.log("Login Actions Values", values)
    //middleware call
    //receive response from backend
    return function (dispatch) {


        axios
          .post("http://localhost:3001/editProfile", values, {
            withCredentials: true
          })
          .then(res => {
            dispatch(getSuccess(res));
          })
          .catch(error => {
            dispatch(getError(error));
          });
    }


}

export default EditProfileAction;

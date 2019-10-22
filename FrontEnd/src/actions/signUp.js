import axios from "axios";

export const SUCCESS_SIGNUP = "success_signup";
export const ERROR_SIGNUP = "error_signup";
//traveler login action
function getSuccess(response) {
  return {
    type: SUCCESS_SIGNUP,
    payload: response
  };
}

function getError(response) {
  return {
    type: ERROR_SIGNUP,
    payload: response
  };
}
function signup(values) {
  //middleware call
  //receive response from backend
  return function(dispatch) {
    console.log(values);

    axios
      .post("http://localhost:3001/register", values)
      .then(res => {
        dispatch(getSuccess(res));
      })
      .catch(error => {
        dispatch(getError(error));
      });
  };
}

export default signup;

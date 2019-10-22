const signUpReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "success_signup") {
      let temp = JSON.stringify(action);
      temp = JSON.parse(temp);
                // let email = temp.payload.data.data.email;
                //         localStorage.setItem('email', email);
                //         localStorage.setItem(
                //             "type",
                //             temp.payload.data.data.type
                //         );
      console.log("Signup data------------------",temp)
      // console.log("in reducer", temp.payload.status);
      // newState.status = temp.payload.status;
      
      console.log(newState);
    } else if (action.type === "error_signup") {
      let temp = JSON.stringify(action);
      temp = JSON.parse(temp);
      console.log("temp error", temp);
      // console.log("in reducer error", temp.payload.response.status);
      // newState.status = 400;
      // console.log(newState);
    }

    //console.log("state in reducer",state);

    return newState;
};

export default signUpReducer;
const loginReducer = (state = {}, action) => {
  let newState = { ...state };
  if (action.type === "login_success") {
    console.log("-----123----");
    let temp = JSON.stringify(action);
    console.log("the temp after stringified", temp);
    temp = JSON.parse(temp);
    console.log("temp after parsing", temp);
    console.log("payload data in temp", temp.payload);
    console.log("the data value in temp", temp.payload.data);
    if (temp.payload.status === 200 && temp.payload.data.data.email) {
      localStorage.setItem(
        "email",
        temp.payload.data.data.email
      );
      localStorage.setItem(
        "type",
        temp.payload.data.data.type
      );
    }
    console.log("in login reducer ---", temp);
    newState.status = temp.payload.status;
    newState.email = temp.payload.data.data.email
    newState.type = temp.payload.data.data.type;
    console.log(newState);
  } else if (action.type === "login_error") {
    let temp = JSON.stringify(action);
    temp = JSON.parse(temp);
    console.log("temp error", temp);
    // console.log("in reducer error", temp.payload.response.status);
    // newState.status = temp.payload.response.status;
    // console.log(newState);
  }

  //console.log("state in reducer",state);

  return newState;
};

export default loginReducer;
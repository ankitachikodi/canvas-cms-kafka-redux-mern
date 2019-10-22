const editProfileReducer = (state = {}, action) => {
  let newState = { ...state };
    if (action.type === "profile_success") {
    console.log("-----123----");
    let temp = JSON.stringify(action);
    temp = JSON.parse(temp);
    
    console.log("in edit profile reducer ---", temp);
    newState.status = temp.payload.status;
    newState.dataEdited=true
    console.log(newState);
    } else if (action.type === "profile_error") {
    let temp = JSON.stringify(action);
    temp = JSON.parse(temp);
    console.log("temp error", temp);
    console.log("in owner reducer error", temp.payload.response.status);
    newState.status = temp.payload.response.status;
        newState.dataEdited = false
    console.log(newState);
  }

  //console.log("state in reducer",state);

  return newState;
};

export default editProfileReducer;
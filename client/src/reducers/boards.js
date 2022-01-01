const initialState = null;

const changeBoardState = (state = initialState, action) => {
  switch (action.type) {
    case "Change Board":
      return action.payload;
    default:
      return state;
  }
};

export default changeBoardState;

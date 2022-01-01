const initialState = [
  // {
  //   name: "Board 1",
  // },
  // {
  //   name: "Board 2",
  // },
  // {
  //   name: "Board 3",
  // },
  // {
  //   name: "Board 4",
  // },
];

const boardData = (state = initialState, action) => {
  switch (action.type) {
    case "Initialize Board":
      return action.payload;
    case "Add Board":
      return [...state, action.payload];
    case "Delete Board":
      return state.filter((element, index) => index !== action.payload);
    default:
      return state;
  }
};

export default boardData;

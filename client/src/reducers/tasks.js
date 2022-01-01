const initialState = [
  // {
  //   title: "Title ",
  //   description:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  //   completed: false,
  // },
  // {
  //   title: "Title 2",
  //   description:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  //   completed: false,
  // },
];

const change = (state = initialState, action) => {
  switch (action.type) {
    case "Get task":
      return action.payload;
    case "Add task":
      return [...state, action.payload];
    case "Delete Task":
      return state.filter((element, index) => index !== action.payload);
    case "Complete Task":
      state[action.payload].completed = true;
      return [...state];
    case "Edit Task":
      state[action.payload.index].task = action.payload.task;
      state[action.payload.index].description = action.payload.description;
      return [...state];
    default:
      return state;
  }
};

export default change;

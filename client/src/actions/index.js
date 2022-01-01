// Tasks

export const getTask = (tasks) => {
  return {
    type: "Get task",
    payload: tasks,
  };
};

export const addTask = (task) => {
  return {
    type: "Add task",
    payload: task,
  };
};

export const deleteTask = (task) => {
  return {
    type: "Delete Task",
    payload: task,
  };
};

export const completeTask = (task) => {
  return {
    type: "Complete Task",
    payload: task,
  };
};

export const editTask = (data) => {
  return {
    type: "Edit Task",
    payload: data,
  };
};

// Boards

export const initializeBoards = (boards) => {
  return {
    type: "Initialize Board",
    payload: boards,
  };
};

export const changeBoard = (board) => {
  return {
    type: "Change Board",
    payload: board,
  };
};

export const addBoard = (board) => {
  return {
    type: "Add Board",
    payload: board,
  };
};

export const deleteBoard = (task) => {
  return {
    type: "Delete Board",
    payload: task,
  };
};

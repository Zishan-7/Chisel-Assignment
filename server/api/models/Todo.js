module.exports = {
  attributes: {
    task: {
      type: "string",
      required: true,
      maxLength: 200,
      example: "Task 1",
    },
    description: {
      type: "string",
      example: "This is a example task",
    },
    completed: {
      type: "boolean",
    },

    board: {
      model: "board",
    },
  },
};

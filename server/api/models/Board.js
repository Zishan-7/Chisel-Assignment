module.exports = {
  attributes: {
    boardName: {
      type: "string",
      required: true,
      maxLength: 200,
      example: "Board 1",
    },
    tasks: {
      collection: "todo",
      via: "board",
    },
  },
};

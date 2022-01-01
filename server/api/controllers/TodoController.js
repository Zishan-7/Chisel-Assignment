module.exports = {
  async create(req, res) {
    let body = req.body;
    let doc = await Todo.create(body).fetch();
    return res.ok({ message: "Todo added successfully", task: doc });
  },

  async get(req, res) {
    try {
      let boardId = req.param("id");
      let doc = await Board.findOne({ id: boardId }).populate("tasks");

      if (doc) {
        return res.ok({
          "message ": `${doc.length} tasks found`,
          tasks: doc,
        });
      } else {
        return res.ok({
          "message ": `No task found`,
        });
      }
    } catch {
      return res.serverError({
        message: "Some error occured",
      });
    }
  },

  async update(req, res) {
    try {
      let taskId = req.param("id");
      let doc = await Todo.updateOne({ id: taskId }).set(req.body);

      if (doc) {
        return res.ok({
          "message ": `Task Updated`,
        });
      } else {
        return res.serverError({
          "message ": `No such task exist`,
        });
      }
    } catch (e) {
      return res.serverError({
        message: "Some error occured",
      });
    }
  },

  async delete(req, res) {
    let todoToDelete = req.param("id");

    let doc = await Todo.destroyOne({ id: todoToDelete });
    if (doc) {
      return res.ok({
        "message ": `Task Deleted successfully`,
      });
    } else {
      return res.serverError({
        message: "No task with corrosponding ID found",
      });
    }
  },
};

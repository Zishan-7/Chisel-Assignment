module.exports = {
  async create(req, res) {
    let body = req.body;
    let doc = await Board.create(body).fetch();
    console.log(doc);
    return res.ok({ message: "Board added successfully", board: doc });
  },

  async get(req, res) {
    let doc = await Board.find();
    return res.ok({
      "message ": `${doc.length} boards found`,
      boards: doc,
    });
  },

  async delete(req, res) {
    let boardToDelete = req.param("id");
    let doc = await Board.destroyOne({ id: boardToDelete });
    if (doc) {
      return res.ok({
        "message ": `Board Deleted successfully`,
      });
    } else {
      return res.serverError({
        message: "No Board with corrosponding ID found",
      });
    }
  },
};

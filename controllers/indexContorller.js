// const { getAllMessages } = require("../db/queries");
const { Messages } = require("../db/queries");

const indexController = async (req, res, next) => {
  try {
    const messages = await Messages.findAll();

    res.status(200).render("index", {
      title: "Mini message board",
      messages,
      currPath: res.currPath,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = indexController;

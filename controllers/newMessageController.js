const { Messages } = require("../db/queries");
const { validationResult } = require("express-validator");

const newMessageController = (req, res) => {
  console.log(req.originalUrl);
  res.status(200).render("new_message", {
    title: "add message",
    currPath: res.currPath,
    errors: [],
  });
};

const addNewMessage = async (req, res, next) => {
  const { message } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("new_message", {
      title: "Add Message",
      errors: errors.array(),
      message,
      currPath: res.currPath,
    });
  }

  await Messages.create(message, req.user.id);

  res.status(201).redirect("/");
};

const getMessage = async (req, res) => {
  const { id } = req.params;

  const data = await Messages.findOne(id);

  const { text, username, added } = data[0];

  const message = {
    id,
    text,
    username,
    added,
  };

  if (!data) {
    return res.status(404).render("404", {
      title: "Message Not Found",
      currPath: res.currPath,
      status: 404,
      user: req.user,
    });
  }

  res.status(200).render("message_details", {
    title: "details",
    message: message,
    currPath: "/",
    user: req.user,
  });
};

module.exports = {
  newMessageController,
  addNewMessage,
  getMessage,
};

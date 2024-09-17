const { body } = require("express-validator");

const validateMessage = [
  body("message")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Message field cannot be empty. Please enter a message."),
];

const validateUser = [];

module.exports = { validateMessage };

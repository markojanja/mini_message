const { body } = require("express-validator");

const validateMessage = [
  body("message")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Message field cannot be empty. Please enter a message."),
];

const validateUser = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Username is required.Must be at least 3 charactes long!"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .escape()
    .withMessage("Password is required!Must be at least 5 charactes long!"),
];

module.exports = { validateMessage, validateUser };

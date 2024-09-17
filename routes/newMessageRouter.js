const { Router } = require("express");
const {
  newMessageController,
  addNewMessage,
  getMessage,
} = require("../controllers/newMessageController");
const { validateMessage } = require("../validators/validators");
const getUrl = require("../middleware/getUrl");
const authMiddleware = require("../middleware/authMiddleware");

const newMessageRouter = Router();

newMessageRouter.use(authMiddleware);

newMessageRouter
  .get("/new", getUrl, newMessageController)
  .post("/new", getUrl, validateMessage, addNewMessage);

newMessageRouter.get("/:id", getMessage);

module.exports = newMessageRouter;

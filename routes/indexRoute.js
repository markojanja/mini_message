const { Router } = require("express");

const indexController = require("../controllers/indexContorller");
const getUrl = require("../middleware/getUrl");

const indexRouter = Router();

indexRouter.get("/", getUrl, indexController);

module.exports = indexRouter;

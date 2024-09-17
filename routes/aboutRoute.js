const { Router } = require("express");

const aboutController = require("../controllers/aboutController");
const getUrl = require("../middleware/getUrl");

const aboutRouter = Router();

aboutRouter.get("/", getUrl, aboutController);

module.exports = aboutRouter;

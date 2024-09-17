const { Router } = require("express");
const { signUp, login, logout } = require("../controllers/authController");
const { validateUser } = require("../validators/validators");

const getUrl = require("../middleware/getUrl");

const authRouter = new Router();

authRouter
  .get("/sign-up", validateUser, getUrl, (req, res) => {
    console.log("curr path", res.currPath);
    res.status(200).render("sign-up", { currPath: res.currPath });
  })
  .post("/sign-up", validateUser, signUp);

authRouter
  .get("/login", getUrl, (req, res) => {
    res.status(200).render("login", { currPath: res.currPath });
  })
  .post("/login", login);

authRouter.get("/logout", logout);

module.exports = authRouter;

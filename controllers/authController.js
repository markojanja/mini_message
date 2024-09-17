const passport = require("passport");
const bcrypt = require("bcrypt");
const { User } = require("../db/queries");

const signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findByName(username);
    if (existingUser) return res.status(400).redirect("/auth/sign-up");
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create(username, hashedPassword);

    res.redirect("/auth/login");
  } catch (error) {
    console.log(error);
  }
};

const login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
});

const logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Error logging out" });
    res.redirect("/");
  });
};

module.exports = { signUp, login, logout };

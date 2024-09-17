const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../db/queries");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findByName(username);

      if (!user) {
        return done(null, false, { message: "user not found" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword)
        return done(null, false, { message: "password is invalid" });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;

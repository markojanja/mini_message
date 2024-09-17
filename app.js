const path = require("path");
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const getUser = require("./middleware/getUserMiddleware");
const getCurrPath = require("./middleware/getCurrPathMiddleware");
const passport = require("./config/passport");
const indexRoute = require("./routes/indexRoute");
const aboutRoute = require("./routes/aboutRoute");
const newMessageRouter = require("./routes/newMessageRouter");
const authRoute = require("./routes/authRoute");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(getUser);
app.use(getCurrPath);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger);

app.use("/", indexRoute);

app.use("/about", aboutRoute);

app.use("/messages", newMessageRouter);

app.use("/auth", authRoute);

app.all("*", (req, res) => {
  res.status(404);
  res.render("404", { title: "Page not found", status: 404 });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Express app running on http://localhost:${PORT}`);
});

module.exports = function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // Proceed to the next middleware or route handler if authenticated
  }
  res.redirect("/auth/login"); // Redirect to login if not authenticated
};

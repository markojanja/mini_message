const getUser = (req, res, next) => {
  res.locals.user = req.user || null; // Pass user data to all views
  next();
};

module.exports = getUser;

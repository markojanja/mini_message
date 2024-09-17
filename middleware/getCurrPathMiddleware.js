const getCurrPath = (req, res, next) => {
  res.locals.currPath = req.currPath || null;
  next();
};

module.exports = getCurrPath;

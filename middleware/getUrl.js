const getUrl = (req, res, next) => {
  res.currPath = req.originalUrl;

  next();
};

module.exports = getUrl;

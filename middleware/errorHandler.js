const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal server error";

  res.render("error", { title: "Error", message, statusCode });
  next();
};

module.exports = errorHandler;

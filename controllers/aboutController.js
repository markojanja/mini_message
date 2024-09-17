const hasError = false;

const aboutController = (req, res, next) => {
  if (hasError) {
    const err = new Error("not found");
    err.status = 404;
    return next(err);
  }

  res.status(200).render("about", { title: "About", currPath: res.currPath });
};

module.exports = aboutController;

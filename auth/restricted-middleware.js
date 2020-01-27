const restricted = (req, res, next) => {
  console.log(req.session);
  req.session && req.session.user
    ? next()
    : res
        .status(400)
        .json({ message: "Please provide valid username and password" });
};

module.exports = restricted;

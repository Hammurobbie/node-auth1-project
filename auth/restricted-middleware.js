const bcrypt = require("bcryptjs");

const restricted = (req, res, next) => {
  const { username, password } = req.headers;

  username && password
    ? res.status(200).json({ message: "Place verification code here" })
    : res
        .status(400)
        .json({ message: "Please provide valid username and password" });

  res.status(401).json({ message: "Restricted Access" });
};

module.exports = restricted;

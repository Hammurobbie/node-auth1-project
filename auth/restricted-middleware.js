const bcrypt = require("bcryptjs");

const users = require("../Users/users-model");

const restricted = (req, res, next) => {
  const { username, password } = req.body;

  username && password
    ? users
        .findBy(username)
        .first()
        .then(user => {
          user && bcrypt.compareSync(password, user.password)
            ? next()
            : res.status(401).json({ message: `Invlaid user credientials` });
        })
        .catch(err => {
          console.log(err.message);
          res.status(401).json({ message: "Unable to retrieve user" });
        })
    : res
        .status(400)
        .json({ message: "Please provide valid username and password" });
};

module.exports = restricted;

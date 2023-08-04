const jwt = require("jsonwebtoken");

const User = require("../models/signup");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    //    console.log("in delete-->",token)

    const user = jwt.verify(token, "8247533361a");

    User.findByPk(user.signupId)
      .then((user) => {
        req.user = user;

        next();
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false });
  }
};

module.exports = { authenticate };

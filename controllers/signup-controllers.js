const sequelize = require("../util/database");

const bcrypt = require("bcrypt");

const signup = require("../models/signup");

exports.getSignupDetails = (req, res, next) => {
  signup
    .findAll()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => console.log(err));
};

exports.postSignupDetails = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  bcrypt.hash(password, 10, async (err, hash) => {
    const data = await signup.create({
      email: email,
      password: password,
      password: hash,
    });
    res.status(201).json({ getDetails: data });
  });
};

exports.postLoginDetails = async (req, res, next) => {
  const email = req.body.email;
  try {
    const user = await signup.findAll({ where: { email } });

    console.log(user[0].password);

    if (user.length > 0) {
      bcrypt.compare(req.body.password, user[0].password, (err, response) => {
        if (err) {
          throw new Error("Something Went Wrong")
        } 
        if(response===true){
            res.status(200).json({ success: true, message: "Login successful" });
        }
        
        else {
          res
            .status(400)
            .json({ success: false, error: "Invalid Credentials" });
        }
      });
    } else {
      res.status(400).json({ success: false, error: "no data" });
    }
  } catch (error) {
    console.log(error);
  }
};

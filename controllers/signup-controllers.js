const sequelize = require("../util/database");

const bcrypt = require("bcrypt");

const signup=require('../models/signup')

const jwt=require("jsonwebtoken")



exports.getSignupDetails = (req, res, next) => {
  signup
    .findAll()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => console.log(err));
};





 const generateAccessToken=(id,isPremiumUser,email)=>{
    return jwt.sign({signupId:id,isPremiumUser:isPremiumUser,email:email} ,'8247533361a')
  }

  


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
    console.log(user)
   

    if (user.length > 0) {
        
      bcrypt.compare(req.body.password, user[0].password, (err, response) => {
        if (err) {
          throw new Error("Something Went Wrong")
        } 
        if(response===true){
          // console.log("checking premium",user[0].ispremuser)
            res.status(200).json({ success: true, message: "Login successful",token:generateAccessToken(user[0].id ,user[0].ispremuser, user[0].email) , email:user[0].email});
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



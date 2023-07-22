const Sib = require("sib-api-v3-sdk");

require("dotenv").config();

const uuid = require("uuid");
const users = require("../models/signup");
const bycrpt=require('bcrypt')

const forgotPassword = require("../models/forgot-password");

exports.forgotPassword = async (req, res, next) => {
    try{
  const email = req.body.email;

  

  const user = await users.findOne({ where: { email } });
  console.log("updating forgot",user)
  let id;
  if (user) {
    id = uuid.v4();

    forgotPassword.create({ id, isActive: true,signupId:user.id }).catch((err) => {
      console.log(err);
    });
  }

  console.log("id", id);

  const client = Sib.ApiClient.instance;

  const apiKey = client.authentications["api-key"];

  apiKey.apiKey = process.env.API_KEY;

  const transactionalEmail = new Sib.TransactionalEmailsApi();

  const sender = {
    email: "sumanthakula05@gmail.com",
    name: "sumanth",
  };

  const reciever = [
    {
      email: email,
    },
  ];

  transactionalEmail
    .sendTransacEmail({
      sender,
      to: reciever,
      subject: "Confirmation to Reset Password",
      // textContent:"Reset Password Link",
      htmlContent: `<h1>Reset Password Link</h1><a href="http://localhost:5000/password/resetpassword/${id}">Reset Password</a>`,
    })
    .then((result) => {
      res.status(200).json({ message: "sent successfully" });
    })
    .catch((err) => console.log("1", err));
}
catch(err){
    console.log(err)
}
};

exports.resetPassword = async (req, res, next) => {
    try{
  const id = req.params.id;
  const forgotPasswordRequest = await forgotPassword.findOne({ where: { id } });

  if (forgotPasswordRequest) {
    forgotPasswordRequest.update({ isActive: false });
    res.status(200).send(`<html>
    <script>
     function formSubmitted(e){
        e.preventDefault()
        console.log("Requested") }
    </script>
    <form action="/password/updatepassword/${id}" method="get">
      <label for="newpassword">Enter New password</label>
      <input name="newpassword" type="password" required></input>
      <button>reset password</button>
    </form>
    </html>`);
  }}
  catch(err){
    console.log(err)
  }
};

exports.updatePassword=async(req,res,next)=>{
    try{
    const newpassword=req.query.newpassword
    const id=req.params.resetpasswordid
    const requestPasswordRequest=await forgotPassword.findOne({where:{id:id}})
    
    const user=await users.findOne({where:{id:requestPasswordRequest.signupId}})
    console.log("in user",user)

    if(user){
        bycrpt.hash(newpassword,10,async(err,hash)=>{
            if(err){
                console.log(err);
                throw new Error(err);
            }
            await user.update({password:hash})
            res.status(201).json({message:"password updated successfully"})
        })
    }
    else{
        return res.status(404).json({ error: 'No user Exists', success: false})
    }
}

catch(err){
    console.log(err)
}

}
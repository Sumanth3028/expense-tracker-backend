const Sib=require('sib-api-v3-sdk')

require("dotenv").config()

exports.forgotPassword=(req,res,next)=>{

    const recEmail=req.body.email

    console.log("recemail",recEmail)

    const client=Sib.ApiClient.instance

    const apiKey=client.authentications['api-key']
    
    apiKey.apiKey=process.env.API_KEY
    
    const transactionalEmail=new Sib.TransactionalEmailsApi()
    
    const sender={
        email:'sumanthakula05@gmail.com',
        name:'sumanth'
    }
    
    
    
    const reciever=[
        {
            email:recEmail
        }
    ]

    transactionalEmail.sendTransacEmail({
        sender,
        to:reciever,
        subject:"Confirmation to Reset Password",
        textContent:"Reset Password Successful"
    }).then(res=>{console.log(res)})
    .catch(err=>console.log(err))

}


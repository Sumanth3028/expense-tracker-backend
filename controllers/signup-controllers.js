const sequelize=require('../util/database')

const signup=require('../models/signup')

exports.getSignupDetails=(req,res,next)=>{
   signup.findAll().then(response=>{
    res.json(response)
   }).catch(err=>console.log(err))
}

exports.postSignupDetails=async(req,res,next)=>{

  
    const email=req.body.email
    const password=req.body.password
    const data=await signup.create({
        
        email:email,
        password:password
    })
    res.status(201).json({getDetails:data})
}

exports.postLoginDetails=async(req,res,next)=>{
    const email=req.body.email
    try{
        const user=await signup.findAll({where:{email
        }})

        console.log(user[0].password)
    
        if(user.length>0){
            if(user[0].password===req.body.password)
            {
                res.status(200).json({success:true,message:"Login successful"})
            }
            else{
                res.json({success:false,error:"Invalid Credentials"})
            }
        }
    }
    
    catch(error){
        console.log(error)
    }
}
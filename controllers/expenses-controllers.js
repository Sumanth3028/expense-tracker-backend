const users = require("../models/expense");
const SignUp=require('../models/signup')
const sequelize=require("../util/database")
const jwt = require("jsonwebtoken");
exports.getExpenseDetails = (req, res, next) => {
  // console.log("userId",userId)
  users
    .findAll({ where: { signupId: req.user.id } })
    .then((expense) => {
      res.json({ expense });
    })
    .catch((err) => console.log(err));
};

exports.postExpenseDetails = async (req, res) => {
  try{
  const t= await sequelize.transaction()
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.select;
  const userId = req.user.id;

  const data = await users.create({
    Amount: amount,
    Description: description,
    Categories: category,
    signupId: userId,
  },{transaction:t});
  const Total_Expenses=Number(req.user.Total_Expenses)+Number(data.Amount)
  
   await SignUp.update({
    Total_Expenses:Total_Expenses
   },{
    where:{id:req.user.id},
    transaction:t
   })
   await t.commit()
  res.status(201).json({ data });
  }
  catch(err){
   await t.rollback ()
    console.log(err)
  }
};

exports.deleteMemberDetails = async(req, res, next) => {
  try{
  const memberId = req.params.id;
  // console.log("in delete exports", req.user.Total_Expenses);

  const expenses=await users.findOne({where:{id:memberId,signupId:req.user.id}})
  console.log("amount",expenses.Amount)

  const Total_Expenses=Number(req.user.Total_Expenses)-Number(expenses.Amount)
  console.log(Total_Expenses)
 
  let mem=await users
    .destroy({ where: { id: memberId, signupId: req.user.id } })
  
    

    await  SignUp.update({
      Total_Expenses:Total_Expenses
     },{
      where:{id:req.user.id}
     })
   res.status(200).json({success:true,message:"Deleted Successfully"})  
   
  }
  catch(err){
    console.log(err)
  } 
    
};

exports.getEditDetails = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect("/");
  }
  const id = req.params.id;

  users
    .findByPk(id)
    .then((det) => {
      res.json({ det: det });
    })
    .catch((err) => console.log(err));
};

exports.editDetails = async (req, res, next) => {

  try{
  const id = req.user.id;
  console.log(id);
  const updatedAmount = req.body.amount;
  console.log(updatedAmount);
  const updatedDescription = req.body.description;
  const updatedCategory = req.body.select;

  await users.findAll({ where: { signupId: id } });

  let res=await req.user.update({
      Amount: updatedAmount,
      Description: updatedDescription,
      Categories: updatedCategory,
    })

    // mem.save();

    
      console.log(res);
  }
  catch(err){
    console.log(err)
  } 
    
};

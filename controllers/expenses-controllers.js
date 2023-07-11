const users=require('../models/expense')


exports.getExpenseDetails=(req,res,next)=>{
    users.findAll().then(expense=>{res.json({expense})}).catch(err=>console.log(err))
}

exports.postExpenseDetails=async(req,res,next)=>{
    const amount= req.body.amount;
    const description=req.body.description;
    const category=req.body.select;
   


    

   const data= await users.create({
       
        Amount:amount,
        Description:description,
        Categories:category
    })

    res.status(201).json({data})
}

exports.deleteMemberDetails=(req,res,next)=>{
    const memberId=req.params.id
    console.log('hello',memberId)
    
    users.findByPk(memberId).then(mem=>{
        mem.destroy()
    }).catch(err=>console.log(err))
}

exports.getEditDetails=(req,res,next)=>{
    const editMode=req.query.edit
    if(!editMode){
        res.redirect('/')
    }
    const id=req.params.id
    users.findByPk(id).then(det=>{res.json({det:det})}).catch(err=>console.log(err))
}

exports.editDetails=(req,res,next)=>{
   const id=req.body.id
   console.log(id)
    const updatedAmount=req.body.res1
    const updatedDescription=req.body.res2
    const updatedCategory=req.body.res3

    users.findByPk(id).then(mem=>{
        mem.Amount=updatedAmount
        mem.Description=updatedDescription
        mem.Categories=updatedCategory
        mem.save()
    }).then(res=>{console.log(res)}).catch(err=>console.log(err))

}
const express=require('express')

const router=express.Router()

const expenseController=require('../controllers/expenses-controllers')

router.get('/getdetails',expenseController.getExpenseDetails)


router.post('/postdetails',expenseController.postExpenseDetails)

router.post(`/deleteDetails/:id`,expenseController.deleteMemberDetails)

router.get(`/editdetails/:id`,expenseController.getEditDetails)

router.post('/editdetails',expenseController.editDetails)
module.exports=router  
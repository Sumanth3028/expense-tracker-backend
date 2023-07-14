const express=require('express')

const router=express.Router()

const expenseController=require('../controllers/expenses-controllers')

const userAuthentication=require('../middleware/authenticate')

router.get('/getdetails',userAuthentication.authenticate,expenseController.getExpenseDetails)


router.post('/postdetails',userAuthentication.authenticate,expenseController.postExpenseDetails)

router.delete(`/deleteDetails/:id`,userAuthentication.authenticate,expenseController.deleteMemberDetails)

router.get(`/editdetails/:id`,expenseController.getEditDetails)

router.post('/editdetails',expenseController.editDetails)
module.exports=router  
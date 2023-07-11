const express=require('express')
const router=express.Router()

const signupController=require('../controllers/signup-controllers')

router.get('/getDetails',signupController.getSignupDetails)

router.post('/postDetails',signupController.postSignupDetails)

router.post('/login',signupController.postLoginDetails)

module.exports=router
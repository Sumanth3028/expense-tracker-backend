const express=require('express')

const router=express.Router()

const forgotController=require('../controllers/forgotPassword-controllers')

router.get('/updatepassword/:resetpasswordid', forgotController.updatePassword)

router.get('/resetpassword/:id',forgotController.resetPassword)

router.post('/forgotPassword',forgotController.forgotPassword)

module.exports=router
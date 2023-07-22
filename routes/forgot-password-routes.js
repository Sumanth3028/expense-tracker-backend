const express=require('express')

const router=express.Router()

const forgotController=require('../controllers/forgotPassword-controllers')

router.post('/forgotPassword',forgotController.forgotPassword)

module.exports=router
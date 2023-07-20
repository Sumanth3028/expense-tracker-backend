const express=require('express')

const router=express.Router()

const premiumControllers=require('../controllers/premium-controllers')
const userAuthentication=require('../middleware/authenticate')

router.get('/showLeaderBoard',userAuthentication.authenticate,premiumControllers.getPremiumLeaderBoard)

module.exports=router
const express=require('express')

const router=express.Router()

const purchaseControllers=require("../controllers/purchase")

const userAuthentication=require('../middleware/authenticate')

router.get("/purchaseMembership",userAuthentication.authenticate, purchaseControllers.purchasePremium)

router.post("/updateMembership",userAuthentication.authenticate, purchaseControllers.updateTransactions)

// router.get("/getPremuimStatus",userAuthentication.authenticate, purchaseControllers.getPremiumStatus)

module.exports=router
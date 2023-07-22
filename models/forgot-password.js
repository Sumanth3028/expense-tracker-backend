const Sequelize=require('sequelize')

const sequelize=require('../util/database')

const forgotPassword=sequelize.define('forgot-password',{
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
     
     isActive: {
        type: Sequelize.BOOLEAN,
        
        // defaultValue: true,
      },
      expiresby: Sequelize.DATE
})

module.exports=forgotPassword
    

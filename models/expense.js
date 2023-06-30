const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const user=sequelize.define(
    "expenses",
    {
    //   id: {
    //     type: Sequelize.INTEGER,
    //     allowIncrement: true,
    //     allowNull:false,
    //     primaryKey: true,
    //   },
      Amount: {
        type: Sequelize.INTEGER,
       
      },
      Description: {
        type: Sequelize.STRING,
      
      },
      Categories: {
        type: Sequelize.STRING,
        
      }
  
     
    },
    {
      timestamps: false,
    }
  );

  module.exports = user;
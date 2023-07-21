const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const signup = sequelize.define(
  "signups",
  {
    
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ispremuser:Sequelize.BOOLEAN,
    Total_Expenses:{
      type:Sequelize.INTEGER,
      defaultValue:0
    }
  },
  {
    timestamps: false,
  }
);
module.exports=signup

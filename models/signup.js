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
  },
  {
    timestamps: false,
  }
);
module.exports=signup

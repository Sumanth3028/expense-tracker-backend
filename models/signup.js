const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const signup = sequelize.define(
  "signup-details",
  {
    
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
module.exports=signup

const Sequelize = require("sequelize");
const sequelize = new Sequelize("expenses", "root", "Sumanth1@", {
  dialect: "mysql",
  host: "localhost",
});

module.exports=sequelize
const Users = require("../models/signup");

const Expenses = require("../models/expense");

const sequelize = require("../util/database");

exports.getPremiumLeaderBoard = async (req, res, next) => {
  try {
    const users = await Users.findAll({
      order:[[sequelize.col("Total_Expenses"),"DESC"]]
    });
    // const userAggregatedExpenses = await Expenses.findAll({
    //   attributes: [
    //     "signupId",
    //     [
    //       sequelize.fn("sum", sequelize.col("expenses.Amount")),
    //       "total_expenses",
    //     ],
    //   ],
    //   group: ["signupId"],
    // });

    // const userAggregatedExpenses = {};
    // expenses.forEach((expense) => {
    //   if (userAggregatedExpenses[expense.signupId]) {
    //     userAggregatedExpenses[expense.signupId] =
    //       userAggregatedExpenses[expense.signupId] + expense.Amount;
    //   } else {
    //     userAggregatedExpenses[expense.signupId] = expense.Amount;
    //   }
    // });
    // var userLeaderBoardDetails = [];
    // users.forEach((user) => {
    //   userLeaderBoardDetails.push({
    //     email: user.email,
    //     total_expenses: userAggregatedExpenses[user.id] || 0,
    //   });
    // });

    // userLeaderBoardDetails.sort((a, b) => {
    //   return b.total_expenses - a.total_expenses;
    // });
    res.json({ users });
  } catch (err) {
    console.log(err);
  }
};

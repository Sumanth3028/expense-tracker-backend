const users = require("../models/expense");
const jwt = require("jsonwebtoken");
exports.getExpenseDetails = (req, res, next) => {
  // console.log("userId",userId)
  users
    .findAll({ where: { signupId: req.user.id } })
    .then((expense) => {
      res.json({ expense });
    })
    .catch((err) => console.log(err));
};

exports.postExpenseDetails = async (req, res) => {
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.select;
  const userId = req.user.id;

  const data = await users.create({
    Amount: amount,
    Description: description,
    Categories: category,
    signupId: userId,
  });

  res.status(201).json({ data });
};

exports.deleteMemberDetails = (req, res, next) => {
  const memberId = req.params.id;
  console.log("in delete exports", req.user);
  console.log(memberId);
  users
    .destroy({ where: { id: memberId, signupId: req.user.id } })
    .then((mem) => {
      return mem;
    })
    .catch((err) => console.log(err));
};

exports.getEditDetails = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect("/");
  }
  const id = req.params.id;

  users
    .findByPk(id)
    .then((det) => {
      res.json({ det: det });
    })
    .catch((err) => console.log(err));
};

exports.editDetails = (req, res, next) => {
  const id = req.body.id;
  console.log(id);
  const updatedAmount = req.body.res1;
  const updatedDescription = req.body.res2;
  const updatedCategory = req.body.res3;

  users
    .findByPk(id)
    .then((mem) => {
      mem.Amount = updatedAmount;
      mem.Description = updatedDescription;
      mem.Categories = updatedCategory;
      mem.save();
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
};

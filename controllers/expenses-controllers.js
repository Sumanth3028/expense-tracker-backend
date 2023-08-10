const users = require("../models/expense");
const SignUp = require("../models/signup");
const sequelize = require("../util/database");
const jwt = require("jsonwebtoken");
const AWS = require("aws-sdk");
require("dotenv").config();


exports.getExpenseDetails = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let totalExpenses;
    const ITEMS_PER_PAGE =parseInt(req.query.limit)||5 ;

    let expense = await users.findAll({
      where: { signupId: req.user.id },
      offset: (page - 1) * ITEMS_PER_PAGE,
      limit: ITEMS_PER_PAGE,
    });

    
    let total = await users.count({ where: { signupId: req.user.id } });

   

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    res.json({
      expense: expense,
      currentPage: page,
      totalPages: totalPages,
      totalItems: total,
      hasNextPage: ITEMS_PER_PAGE * page < total,
      nextPage: page + 1,
      hasPreviousPage: page > 1,
      previousPage: page - 1,
      
    });

    // let product= await users.findAll({ where: { signupId: req.user.id } },)
    // console.log("Product",product)
  } catch (err) {
    console.log(err);
  }
};

exports.postExpenseDetails = async (req, res) => {
  try {
    const t = await sequelize.transaction();
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.select;
    const userId = req.user.id;

    const data = await users.create(
      {
        Amount: amount,
        Description: description,
        Categories: category,
        signupId: userId,
      },
      { transaction: t }
    );
    const Total_Expenses =
      Number(req.user.Total_Expenses) + Number(data.Amount);

    await SignUp.update(
      {
        Total_Expenses: Total_Expenses,
      },
      {
        where: { id: req.user.id },
        transaction: t,
      }
    );
    await t.commit();
    res.status(201).json({ data });
  } catch (err) {
    await t.rollback();
    console.log(err);
  }
};

exports.deleteMemberDetails = async (req, res, next) => {
  try {
    const memberId = req.params.id;
    // console.log("in delete exports", req.user.Total_Expenses);

    const expenses = await users.findOne({
      where: { id: memberId, signupId: req.user.id },
    });
    console.log("amount", expenses.Amount);

    const Total_Expenses =
      Number(req.user.Total_Expenses) - Number(expenses.Amount);
    console.log(Total_Expenses);

    let mem = await users.destroy({
      where: { id: memberId, signupId: req.user.id },
    });

    await SignUp.update(
      {
        Total_Expenses: Total_Expenses,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.status(200).json({ success: true, message: "Deleted Successfully" });
  } catch (err) {
    console.log(err);
  }
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

exports.editDetails = async (req, res, next) => {
  try {
    const id = req.user.id;
    console.log(id);
    const updatedAmount = req.body.amount;
    console.log(updatedAmount);
    const updatedDescription = req.body.description;
    const updatedCategory = req.body.select;

    await users.findAll({ where: { signupId: id } });

    let res = await req.user.update({
      Amount: updatedAmount,
      Description: updatedDescription,
      Categories: updatedCategory,
    });

    // mem.save();

    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

function uploadToS3(data, fileName) {
  try {
    const BUCKET_NAME = "expensetracker1243";
    const IAM_USER_KEY = process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

    console.log(IAM_USER_SECRET);

    let s3Bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
    });

    var params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: data,
      ACL: "public-read",
    };

    return new Promise((resolve, reject) => {
      s3Bucket.upload(params, (err, resdata) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(resdata.Location);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
}

exports.downloadExpenses = async (req, res, next) => {
  try {
    let user = req.user.id;

    const premUser = await SignUp.findOne({ where: { id: user } });

    console.log(premUser);

    if (premUser.ispremuser === true) {
      const expenses = await req.user.getExpenses();
      // console.log(expenses)

      const stringifiedExpenses = JSON.stringify(expenses);
      const fileName = `Expenses${user}/${new Date()}.txt`;
      const fileUrl = await uploadToS3(stringifiedExpenses, fileName);
      console.log(fileUrl);
      res.status(200).json({ fileUrl, success: true });
    } else {
      res.status(401).json({ success: false, message: "UnAuthorized" });
    }
  } catch (err) {
    console.log(err);
  }
};

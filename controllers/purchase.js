const Razorpay = require("razorpay");
require("dotenv").config();
const Order = require("../models/orders");

exports.purchasePremium = async (req, res) => {
  console.log("process is--->", process.env.RAZORPAY_KEY_ID);
  try {
    var rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = 10000;
    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      req.user
        .createOrder({ orderid: order.id, status: "PENDING" })
        .then(() => {
          return res.status(201).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateTransactions = async (req, res, next) => {
  try {
    const payment_id = req.body.payment_id;
    const order_id = req.body.order_id;
    console.log(order_id);
    const order = await Order.findOne({ where: { orderid: order_id } });
    const promise1= order.update({ paymentid: payment_id, status: "SUCCESSFUL" });
    const promise2= req.user.update({ ispremuser: true });
    Promise.all([promise1,promise2]).then(()=>{ return res
      .status(202)
      .json({ success: true, message: "transaction successful" });}).catch((err)=>{console.log(err)})
   
  } catch (err) {
    console.log(err);
  }
};

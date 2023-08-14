const express = require("express");

const path = require("path");

const fs = require("fs");

require("dotenv").config();

const helmet = require("helmet");

const compression = require("compression");

const morgan = require("morgan");

const bodyParser = require("body-parser");

const Sequelize = require("./util/database");

const cors = require("cors");

const app = express();

const user = require("./models/signup");

const expense = require("./models/expense");

const order = require("./models/orders");

const password = require("./models/forgot-password");

const expenseRoutes = require("./routes/expenses-routes");
const signupRoutes = require("./routes/signup-routes");
const purchaseroutes = require("./routes/purchase-routes");
const premiumRoutes = require("./routes/premium-routes");
const forgotPasswordRoutes = require("./routes/forgot-password-routes");


const accessStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

app.use(cors());

app.use(helmet());

// app.use(compression())

app.use(morgan('combined',{stream:accessStream}));

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/expense", expenseRoutes);
app.use(signupRoutes);
app.use(purchaseroutes);
app.use(premiumRoutes);
app.use("/password", forgotPasswordRoutes);

user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(order);
order.belongsTo(user);

user.hasMany(password);
password.belongsTo(user);

Sequelize.sync()
  .then((res) => app.listen(process.env.PORT))
  .catch((err) => console.log(err));

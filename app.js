const express=require('express')

const path=require('path')

const bodyParser=require('body-parser')

const Sequelize=require('./util/database')

const cors=require('cors')

const app=express()

const user=require('./models/signup')

const expense=require('./models/expense')

const order=require('./models/orders')


const expenseRoutes=require('./routes/expenses-routes')
const signupRoutes=require('./routes/signup-routes')
const purchaseroutes=require('./routes/purchase-routes')
const premiumRoutes=require('./routes/premium-routes')
const { or } = require('sequelize')

app.use(cors())

app.use(bodyParser.json({extended:false}))
app.use(express.static(path.join(__dirname, "public")));

app.use('/expense',expenseRoutes)
app.use(signupRoutes)
app.use(purchaseroutes)
app.use(premiumRoutes)

user.hasMany(expense)
expense.belongsTo(user)

user.hasMany(order)
order.belongsTo(user)

Sequelize.sync().then(res=>app.listen(5000)).catch(err=>console.log(err))




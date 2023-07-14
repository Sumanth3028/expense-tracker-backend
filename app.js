const express=require('express')

const path=require('path')

const bodyParser=require('body-parser')

const Sequelize=require('./util/database')

const cors=require('cors')

const app=express()

const user=require('./models/signup')

const expense=require('./models/expense')


const expenseRoutes=require('./routes/expenses-routes')
const signupRoutes=require('./routes/signup-routes')

app.use(cors())

app.use(bodyParser.json({extended:false}))
app.use(express.static(path.join(__dirname, "public")));

app.use('/expense',expenseRoutes)
app.use(signupRoutes)

user.hasMany(expense)
expense.belongsTo(user)

Sequelize.sync().then(res=>app.listen(5000)).catch(err=>console.log(err))




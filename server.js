const express = require('express')
const studentRouter = require('./routes/student')
const indexRouter = require('./routes/index')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express();

require('dotenv').config()

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.STR_CONNECT)
        console.log("Connected successfully")

    } catch (e) {
        console.log(e)
        console.log("Connect failed")
    }
}
connectDB()

app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use('/student/', studentRouter)
app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)
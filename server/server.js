const express = require("express")
require("dotenv").config()
const connectDB = require("./src/config/connectDB")
const indexRoutes = require('./src/routes/indexRoutes')
const cookieParser = require("cookie-parser")

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


connectDB()

indexRoutes(app)

const port = process.env.PORT || 7979

app.listen(port, () => {
    console.log("Server runing on the port: " + port);
})
const express = require("express")
require("dotenv").config()


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', (req, res) => {
    res.send("SERVER ONNNNN")
}) 

const port = process.env.PORT || 7979

app.listen(port, () => {
    console.log("Server runing on the port: " + port);
})
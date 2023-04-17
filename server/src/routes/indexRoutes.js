const userRouter = require("./userRouter")
const { notFound, errHandler } = require("../controllers/middlewares/errorHandler")

const indexRoutes = (app) => {
    app.use("/user", userRouter)



    app.use(notFound)
    app.use(errHandler)
}


module.exports = indexRoutes
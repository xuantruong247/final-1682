const userRouter = require("./userRouter")
const productRouter = require("./productRoutes")
const { notFound, errHandler } = require("../middlewares/errorHandler")

const indexRoutes = (app) => {
    app.use("/user", userRouter)
    app.use("/product", productRouter)



    app.use(notFound)
    app.use(errHandler)
}


module.exports = indexRoutes
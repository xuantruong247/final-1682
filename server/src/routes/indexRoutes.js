const userRouter = require("./userRouter")
const productRouter = require("./productRoutes")
const productCategoryRouter = require("./productCategory")
const blogCategoryRouter = require("./blogCetogory")
const { notFound, errHandler } = require("../middlewares/errorHandler")

const indexRoutes = (app) => {
    app.use("/user", userRouter)
    app.use("/product", productRouter)
    app.use("/productcategory", productCategoryRouter)
    app.use("/blogcategory", blogCategoryRouter)



    app.use(notFound)
    app.use(errHandler)
}


module.exports = indexRoutes
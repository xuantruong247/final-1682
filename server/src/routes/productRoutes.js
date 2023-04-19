const express = require("express")
const ctrls = require("../controllers/productController")
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken")
const router = express.Router()

router.post("/create", [verifyAccessToken, isAdmin], ctrls.createProduct)
router.get("/", ctrls.getAllProducts)
router.put("/ratings", [verifyAccessToken], ctrls.ratings)


router.delete("/delete/:pid", [verifyAccessToken, isAdmin], ctrls.deleteProduct)
router.put("/update/:pid", [verifyAccessToken, isAdmin], ctrls.updateProduct)
router.get("/:pid", ctrls.getDetailProduct)

module.exports = router

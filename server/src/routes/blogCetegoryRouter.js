const express = require("express")
const ctrls = require("../controllers/blogCategoryController")
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken")
const router = express.Router()


router.post("/create", [verifyAccessToken, isAdmin], ctrls.createCategory)
router.get("/", ctrls.getCategories)
router.put("/update/:bcid", [verifyAccessToken, isAdmin], ctrls.updatedCategory)
router.delete("/delete/:bcid", [verifyAccessToken, isAdmin], ctrls.deletedCategory)


module.exports = router

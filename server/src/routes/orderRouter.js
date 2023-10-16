const express = require("express")
const ctrls = require("../controllers/orderController")
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken")
const router = express.Router()


router.post("/create", [verifyAccessToken], ctrls.createNewOrder)
router.get("/userorder", [verifyAccessToken], ctrls.getUserOrder)
router.get("/", [verifyAccessToken, isAdmin], ctrls.getAllOrders)
router.get("/week-sales", [verifyAccessToken, isAdmin], ctrls.getWeekSales)


router.delete("/delete/:oid", [verifyAccessToken, isAdmin], ctrls.deleteOrder)
router.put("/status/:oid", [verifyAccessToken, isAdmin], ctrls.updateStatusOrder)
module.exports = router

const express = require("express")
const ctrls = require("../controllers/userController")
const { verifyAccessToken } = require("../middlewares/verifyToken")
const router = express.Router()

router.post('/register', ctrls.register)
router.post('/login', ctrls.login)
router.get('/current', verifyAccessToken, ctrls.getCurrent)


module.exports = router
const User = require("../models/user")
const asyncHandler = require("express-async-handler")
const { generateAccessToken, generateRefreshToken } = require("../middlewares/jwt")

//create
const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname, mobile } = req.body
    if (!email || !password || !firstname || !lastname || !mobile) {
        return res.status(400).json({
            sucess: false,
            message: "Missing Text"
        })
    }
    const checkEmail = await User.findOne({ email })
    if (checkEmail) throw new Error("Email has existed")
    const checkMobile = await User.findOne({ mobile })
    if (checkMobile) throw new Error("Mobile has existed")
    else {
        const newUser = await User.create(req.body)
        return res.status(200).json({
            success: newUser ? true : false,
            message: newUser ? "Register is successfully. Please go login~" : "Something went wrong"
        })
    }
})


//login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            sucess: false,
            message: "Missing Text"
        })
    }
    // plain object
    const response = await User.findOne({ email })
    if (response && await response.isCorrectPassword(password)) {
        // Tách password và role ra khỏi response
        const { password, role, ...userData } = response.toObject()
        // create access token
        const accessToken = generateAccessToken(response._id, role)
        //create refresh token
        const refreshToken = generateRefreshToken(response._id)
        // save refreshToken DB
        await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true })
        // save refreshToken cookie
        res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
        return res.status(200).json({
            success: true,
            accessToken,
            userData
        })
    } else {
        throw new Error("Wrong Email or Password")
    }

})

//getOne
const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id).select('-refreshToken -password -role')
    return res.status(200).json({
        success: user ? true : false,
        rs: user ? user : 'User not found'
    })
})



module.exports = {
    register,
    login,
    getCurrent
}
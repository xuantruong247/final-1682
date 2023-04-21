const Coupon = require("../models/coupon")
const aysncHandler = require("express-async-handler")

const createNewCoupon = aysncHandler(async (req, res) => {
    const { name, discount, expiry } = req.body
    if (!name || !discount || !expiry) throw new Error("Missting text")
    const response = await Coupon.create({
        ...req.body,
        expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000
    })
    return res.status(200).json({
        success: response ? true : false,
        createdCoupon: response ? response : "Cannot create new Coupon"
    })
})


const getAllCoupons = aysncHandler(async (req, res) => {
    const response = await Coupon.find().select('-createdAt -updatedAt')
    return res.status(200).json({
        success: response ? true : false,
        coupon: response ? response : "Cannot get all Coupon"
    })
})


const updatedCoupon = aysncHandler(async (req, res) => {
    const { cid } = req.params
    if (Object.keys(req.body).length === 0) throw new Error("Missting text")
    if (req.body.expiry) req.body.expiry = Date.now() + +req.body.expiry * 24 * 60 * 60 * 1000
    const response = await Coupon.findByIdAndUpdate(cid, req.body, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        updateCoupon: response ? response : "Cannot updated Coupon"
    })
})


const deletedCoupon = aysncHandler(async (req, res) => {
    const { cid } = req.params
    const response = await Coupon.findByIdAndDelete(cid)
    return res.status(200).json({
        success: response ? true : false,
        deletedCoupon: response ? "Deleted Coupon successfully!" : "Cannot delete Coupon"
    })
})



module.exports = {
    createNewCoupon,
    getAllCoupons,
    updatedCoupon,
    deletedCoupon
}
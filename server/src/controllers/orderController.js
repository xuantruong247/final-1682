const Order = require("../models/order")
const User = require("../models/user")
const Coupon = require("../models/coupon")
const aysncHandler = require("express-async-handler")

const createNewOrder = aysncHandler(async (req, res) => {
    const { _id } = req.user
    const { coupon } = req.body
    const userCart = await User.findById(_id).select('cart').populate("cart.product", "title price")
    console.log(userCart);
    const products = userCart?.cart?.map(el => ({
        product: el.product._id,
        count: el.quantity
    }))
    let total = userCart?.cart?.reduce((sum, el) => el.product.price * el.quantity + sum, 0)
    const createData = { products, total, orderBy: _id }
    if (coupon) {
        const selectedCoupon = await Coupon.findById(coupon)
        total = Math.round(total * (1 - +selectedCoupon?.discount / 100) / 1000) * 1000 || total
        createData.total = total
        createData.coupon = coupon
    }
    console.log(total);
    const response = await Order.create(createData)
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Something went wrong",
        userCart
    })
})


const updateStatusOrder = aysncHandler(async (req, res) => {
    const { oid } = req.params
    const { status } = req.body
    if (!status) throw new Error("Missting status")
    const response = await Order.findByIdAndUpdate(oid, { status }, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Something went wrong"
    })
})


const getUserOrder = aysncHandler(async (req, res) => {
    const { _id } = req.user
    const response = await Order.find({ orderBy: _id })
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Something went wrong"
    })
})


const getAllOrders = aysncHandler(async (req, res) => {
    const response = await Order.find()
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Something went wrong"
    })
})


const deleteOrder = aysncHandler(async (req, res) => {
    const { oid } = req.params
    const response = await Order.findByIdAndDelete(oid)
    return res.status(200).json({
        success: response ? true : false,
        response: response ? "Delete Order Success" : "Something went wrong"
    })
})

module.exports = {
    createNewOrder,
    updateStatusOrder,
    getUserOrder,
    getAllOrders,
    deleteOrder
}
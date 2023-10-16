const Order = require("../models/order")
const User = require("../models/user")
const asyncHandler = require("express-async-handler")
const moment = require("moment")


const createNewOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { products, total, address, status } = req.body;

    if (address) {
        await User.findByIdAndUpdate(_id, { address, cart: [] });
    }

    const data = {
        products,
        total,
        postedBy: _id, // Thêm trường postedBy để lưu ID của người đặt hàng
    };

    if (status) {
        data.status = status;
    }

    const response = await Order.create(data);

    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Something went wrong",
    });

})


const updateStatusOrder = asyncHandler(async (req, res) => {
    const { oid } = req.params
    const { status } = req.body
    if (!status) throw new Error("Missting status")
    const response = await Order.findByIdAndUpdate(oid, { status }, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Something went wrong"
    })
})


const getUserOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const response = await Order.find({ orderBy: _id })
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Something went wrong"
    })
})


const getAllOrders = asyncHandler(async (req, res) => {
    const response = await Order.find();
    const counts = await Order.find().countDocuments();

    // Tính tổng của trường "total"
    let totalSum = 0;
    for (const order of response) {
        totalSum += order.total;
    }

    return res.status(200).json({
        success: response ? true : false,
        counts,
        totalSum, // Tổng của trường "total"
        response: response ? response : "Something went wrong"
    });
});



const getWeekSales = asyncHandler(async (req, res) => {
    const today = moment();
    const dayOfWeek = today.day();

    // Tính ngày đầu của tuần hiện tại (ngày chủ nhật)
    const startOfWeek = today.clone().subtract(dayOfWeek, 'days');

    // Tính ngày đầu của tuần kế tiếp (ngày chủ nhật)
    const startOfNextWeek = startOfWeek.clone().add(7, 'days');

    const weekSale = await Order.aggregate([
        {
            $match: { createdAt: { $gte: new Date(startOfWeek), $lt: new Date(startOfNextWeek) } },
        },
        {
            $lookup: {
                from: 'users', // Tên của collection User
                localField: 'postedBy',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $project: {
                day: { $dayOfWeek: "$createdAt" },
                sales: "$total",
                postedBy: "$postedBy",
                orderDate: "$createdAt",
                status: "$status",
                orderId: "$_id",
                firstname: { $arrayElemAt: ["$user.firstname", 0] },
                lastname: { $arrayElemAt: ["$user.lastname", 0] }
            },
        },
        {
            $group: {
                _id: "$day",
                total: { $sum: "$sales" },
                salesInfo: {
                    $push: {
                        status: "$status",
                        orderDate: "$orderDate",
                        userId: "$postedBy",
                        firstname: "$firstname",
                        lastname: "$lastname",
                        total: "$sales",
                        orderId: "$orderId",
                    }
                }
            },
        },
    ]);

    const totalWeekSales = weekSale.reduce((total, day) => total + day.total, 0);

    return res.status(200).json({
        success: weekSale ? true : false,
        weekSale: weekSale ? weekSale : "Something went wrong",
        totalWeekSales,
    });
});


const deleteOrder = asyncHandler(async (req, res) => {
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
    getWeekSales,
    getAllOrders,
    deleteOrder
}
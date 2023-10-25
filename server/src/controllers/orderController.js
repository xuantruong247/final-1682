const Order = require("../models/order")
const User = require("../models/user")
const Product = require("../models/product")
const asyncHandler = require("express-async-handler")
const moment = require("moment")


const createNewOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { products, total, address } = req.body;
    console.log(req.body);
    if (address) {
        await User.findByIdAndUpdate(_id, { address, cart: [] });
    }

    const data = {
        products,
        total,
        postedBy: _id,
    };
    console.log(data);
    const response = await Order.create(data);
    console.log(response);
    // for (const product of products) {
    //     const { _id: productId, quantity } = product;

    //     // Tìm sản phẩm và chỉ cập nhật trường "sold"
    //     await Product.findByIdAndUpdate(productId, {
    //         $inc: { sold: quantity },
    //     });
    // }

    // Lấy ID của đơn hàng vừa tạo
    const orderId = response._id;

    // Cập nhật mảng `purchaseHistory` của người dùng
    await User.findByIdAndUpdate(_id, {
        $push: {
            purchaseHistory: {
                order: orderId,
            }
        }
    });

    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Something went wrong",
    });
})




// const updateStatusOrder = asyncHandler(async (req, res) => {
//     const { oid } = req.params
//     const { status } = req.body
//     if (!status) throw new Error("Missting status")
//     const response = await Order.findByIdAndUpdate(oid, { status }, { new: true })
//     return res.status(200).json({
//         success: response ? true : false,
//         response: response ? response : "Something went wrong"
//     })
// })


const getUserOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const response = await Order.find({ orderBy: _id })
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Something went wrong"
    })
})

const getAllOrders = asyncHandler(async (req, res) => {
    // const { page = 1, limit = 12 } = req.query;
    const query = Order.find();
    query.populate({
        path: "postedBy",
        select: "lastname firstname"
    });
    const counts = await Order.countDocuments();

    // Gắn limit và skip vào truy vấn
    // query.limit(parseInt(limit)).skip((page - 1) * limit);

    const response = await query.exec();
    // Tính tổng của trường "total"
    let totalSum = 0;
    for (const order of response) {
        totalSum += order.total;
    }
    // const formattedTotalSum = totalSum.toFixed(2);

    return res.status(200).json({
        success: response ? true : false,
        counts,
        totalSum, // Tổng của trường "total"
        getOrders: response ? response : "Cannot get order ",
    });
});


const getDetailOrder = asyncHandler(async (req, res) => {
    const { oid } = req.params
    console.log(oid);
    const order = await Order.findById(oid).populate('products.product', 'avatar title price').populate({
        path: 'postedBy',
        select: 'lastname firstname'
    });


    if (!order) throw new Error("Order not found")

    return res.status(200).json({
        success: order ? true : false,
        getDetailOrder: order ? order : 'Order not found'
    })

})

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
                statusPayment: "$statusPayment", // Thêm trường này
                statusOrder: "$statusOrder", // Thêm trường này
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
                        statusPayment: "$statusPayment", // Sử dụng trường statusPayment
                        statusOrder: "$statusOrder", // Sử dụng trường statusOrder
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


    const formattedTotalSum = totalWeekSales.toFixed(2);


    return res.status(200).json({
        success: weekSale ? true : false,
        weekSale: weekSale ? weekSale : "Something went wrong",
        totalWeekSales: formattedTotalSum,
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
    // updateStatusOrder,
    getDetailOrder,
    getUserOrder,
    getWeekSales,
    getAllOrders,
    deleteOrder
}
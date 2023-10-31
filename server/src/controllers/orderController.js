const Order = require("../models/order")
const User = require("../models/user")
const asyncHandler = require("express-async-handler")
const moment = require("moment")


const createNewOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { products, total, address } = req.body;
    if (address) {
        await User.findByIdAndUpdate(_id, { address, cart: [] });
    }

    const data = {
        products,
        total,
        postedBy: _id,
    };
    const response = await Order.create(data);
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




const updateStatusOrder = asyncHandler(async (req, res) => {
    const { oid } = req.params
    const { statusPayment, statusOrder } = req.body
    if (!statusPayment || !statusOrder) throw new Error("Missting status")
    const response = await Order.findByIdAndUpdate(oid, { statusPayment, statusOrder }, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Something went wrong"
    })
})


const getUserOrder = asyncHandler(async (req, res) => {
    const { page = 1, limit = 12, statusOrderId } = req.query;

    const { _id } = req.user;

    let query = Order.find();


    let statusOrderArray = [];
    if (statusOrderId) {
        statusOrderArray = statusOrderId.split(','); // Tách chuỗi thành mảng dựa trên dấu phẩy
    }
    let objectFind = {};
    if (statusOrderArray.length > 0) {
        objectFind.statusOrder = { $in: statusOrderArray }; // Sử dụng $in để tìm các danh mục trong mảng
    }

    objectFind.postedBy = _id;

    const counts = await Order.find(objectFind).countDocuments();

    query = Order.find(objectFind);


    query = query.limit(parseInt(limit)).skip((page - 1) * limit);

    query = query.populate({
        path: 'products.product',
        select: 'avatar title price'
    });

    const response = await query.exec();

    let totalSum = 0;
    for (const order of response) {
        totalSum += order.total;
    }
    const formattedTotalSum = totalSum.toFixed(2);

    return res.status(200).json({
        success: response ? true : false,
        counts,
        totalSum: formattedTotalSum,
        getOrders: response ? response : "Cannot get order ",
    });
});




const getAllOrders = asyncHandler(async (req, res) => {
    const { page = 1, limit = 12, sortField, sortOrder, startDays, endDays, statusOrderId } = req.query;
    let query = Order.find();

    // Kiểm tra nếu có giá trị startDate và endDate từ người dùng
    if (startDays && endDays) {
        // Chuyển ngày bắt đầu và ngày kết thúc thành đối tượng Date
        const startDaysTime = new Date(startDays);
        const endDaysTime = new Date(endDays);

        // Thêm điều kiện để lọc theo khoảng thời gian
        query = query.where('createdAt').gte(startDaysTime).lt(new Date(endDaysTime.getTime() + 86400000));
    }

    let statusOrderArray = [];
    if (statusOrderId) {
        statusOrderArray = statusOrderId.split(','); // Tách chuỗi thành mảng dựa trên dấu phẩy
    }
    let objectFind = {};
    if (statusOrderArray.length > 0) {
        objectFind.statusOrder = { $in: statusOrderArray }; // Sử dụng $in để tìm các danh mục trong mảng
    }

    const counts = await Order.find(objectFind).countDocuments();

    query = Order.find(objectFind);
    query = query.populate({
        path: 'postedBy',
        select: 'firstname lastname',
    });

    if (sortField && sortOrder) {
        const sortOption = {};
        sortOption[sortField] = sortOrder === 'asc' ? 1 : -1;
        query = query.sort(sortOption);
    }

    query = query.limit(parseInt(limit)).skip((page - 1) * limit);

    const response = await query.exec();

    let totalSum = 0;
    for (const order of response) {
        totalSum += order.total;
    }
    const formattedTotalSum = totalSum.toFixed(2);

    return res.status(200).json({
        success: response ? true : false,
        counts,
        totalSum: formattedTotalSum,
        getOrders: response ? response : "Cannot get order ",
    });
});


const getDetailOrder = asyncHandler(async (req, res) => {
    const { oid } = req.params
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


    let startOfWeek, startOfNextWeek;

    if (req.query.startDays && req.query.endDays) {

        startOfWeek = moment(req.query.endDays).subtract(req.query.startDays, 'days');
        startOfNextWeek = moment(req.query.endDays).add(1, 'days');
    } else {
        startOfWeek = today.clone().subtract(dayOfWeek, 'days');
        startOfNextWeek = startOfWeek.clone().add(7, 'days');
    }


    const weekSale = await Order.aggregate([
        {
            $match: { createdAt: { $gte: new Date(startOfWeek), $lt: new Date(startOfNextWeek) } },
        },
        {
            $lookup: {
                from: 'users',
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


const cancelOrder = asyncHandler(async (req, res) => {
    const { oid } = req.params
    const order = await Order.findById(oid)

    if (!order) throw new Error("oid not found")

    order.statusOrder = "Processing"
    await order.save()

    return res.status(200).json({
        success: true,
        response: order
    });

})


module.exports = {
    createNewOrder,
    updateStatusOrder,
    getDetailOrder,
    getUserOrder,
    getWeekSales,
    getAllOrders,
    deleteOrder,
    cancelOrder,
}
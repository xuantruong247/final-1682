const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    products: [{
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        count: Number,
    }],
    status: {
        type: String,
        default: "Processing",
        enum: ['Cancelled', "Processing", "Succeed"]
    },
    total: Number,
    coupon: {
        type: mongoose.Types.ObjectId,
        ref: "Coupon"
    },
    orderBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Order', orderSchema);
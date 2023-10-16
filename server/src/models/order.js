const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    products: [{
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
        avatar: String,
        title: String,
    }],
    status: {
        type: String,
        default: "Cancelled",
        enum: ['Cancelled', "Succeed"]
    },
    total: Number,
    postedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }

},
    {
        timestamps: true
    });

module.exports = mongoose.model('Order', orderSchema);
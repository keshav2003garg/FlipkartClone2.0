const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: [true, "Please enter Shipping Address"]
        },
        city: {
            type: String,
            required: [true, "Please enter your city"]
        },
        pinCode: {
            type: Number,
            required: [true, "Please enter your area pincode"]
        },
        state: {
            type: String,
            required: [true, "Please enter your state"]
        },
        country: {
            type: String,
            required: [true, "Please enter your country"]
        },
        phoneNo: {
            type: Number,
            required: [true, "Please enter your phone number"]
        },
    },
    orderedItems: [{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        productId: {
            type: mongoose.Schema.ObjectId,
            ref: "product",
            required: true
        }
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    },
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            requires: true
        },
    },
    paidAt: {
        type: Date,
        required: true
    },
    itemsPrice: {
        type: Number,
        default: 0,
        required: true
    },
    taxPrice: {
        type: Number,
        default: 0,
        required: true
    },
    shippingPrice: {
        type: Number,
        default: 0,
        required: true
    },
    totalPrice: {
        type: Number,
        default: 0,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing"
    },
    delivedAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('order', orderSchema);
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please enter product description"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        maxlength: [8, "Price cannot exceeds 1Crore"]
    },
    rating: {
        type: Number,
        default: 0,
    },
    images: [{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: [true, "Please provide product image URL"],
        }
    }],
    category: {
        type: String,
        required: [true, "Please provide product category"],
    },
    stock: {
        type: Number,
        required: [true, "Please provide product stock"],
        maxlength: [6, "Product Stock cannot exceeds 1Lakh"],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
            required: [true, "Please enter userID"],
        },
        name: {
            type: String,
            required: true,
            default: "Flipkart User",
        },
        comment: {
            type: String,
            required: [true, "Product review comment cannot be empty"],
        },
        rating: {
            type: Number,
            required: true,
        }
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: [true, "Please enter userID"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('product', productSchema);
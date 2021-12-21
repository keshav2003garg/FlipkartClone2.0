const express = require('express');
const router = express.Router();

const Product = require('../models/product.model');
const productFiltration = require('../utils/productFiltration');
const { isAuthenticated, authorizeRoles } = require('../middlewares/authentication');




router.post('/admin/create', isAuthenticated, authorizeRoles("admin"), async (req, res) => {
    try {
        req.body.user = req.user.id;
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product: product,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});


router.get('/get', async (req, res) => {
    try {
        const productFiltering = new productFiltration(Product.find(), req.query).search().filter().pagination(5);

        const products = await productFiltering.products;
        if (!products) {
            res.status(400).json({
                success: false,
                message: "Product not Found",
            });
        }

        const productCount = await Product.countDocuments();

        res.status(200).json({
            products: products,
            productCount: productCount,
        });
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        };
    }
});


router.post('/get-detail/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(400).json({
                success: false,
                message: "Product not Found",
            });
        }

        res.status(200).json({
            success: true,
            product: product,
        });
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        };
    }
})


router.put('/admin/update/:id', isAuthenticated, authorizeRoles("admin"), async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false });
        if (!product) {
            res.status(400).json({
                success: false,
                message: "Product not Found",
            });
        }

        res.status(200).json({
            success: true,
            updatedProduct: product,
        });
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        };
    }
});


router.delete('/admin/delete/:id', isAuthenticated, authorizeRoles("admin"), async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            res.status(400).json({
                success: false,
                message: "Product not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully",
        });
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        };
    }
});


router.post('/review-product/:id', isAuthenticated, async (req, res) => {
    try {
        const { comment, rating } = req.body;
        const { _id, name } = req.user;

        const review = { user: _id, name: name, comment: comment, rating: Number(rating) };

        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(400).json({
                success: false,
                message: "Product not Found",
            });
        };

        let isReviewed = false;
        product.reviews.forEach((review) => { if (review.user.id.toString("hex") == req.user._id.toString()) { isReviewed = true } });
        if (isReviewed) {
            product.reviews.forEach((review) => {
                if (review.user.id.toString("hex") == req.user._id.toString()) {
                    review.comment = comment;
                    review.rating = rating;
                };
            });
        }
        else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
        }
        let productRating = 0;
        product.reviews.forEach((review) => { productRating += review.rating });
        product.rating = productRating / product.reviews.length;
        await product.save();

        res.status(201).json({
            success: true,
            message: "Rated Successfully",
        });
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        };
    }
});


router.get('/get-all-reviews/:productId', isAuthenticated, async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            res.status(400).json({
                success: false,
                message: "Product not Found",
            });
        };

        const reviews = product.reviews;

        res.status(200).json({
            success: true,
            productReviews: reviews,
        })
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        };
    }
});


router.delete('/delete-review/:productId/:reviewId', isAuthenticated, authorizeRoles("admin"), async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            res.status(400).json({
                success: false,
                message: "Product not Found",
            });
        };

        const reviews = product.reviews.filter((review) => { return (review.id != req.params.reviewId) });

        let productRating = 0;
        reviews.forEach((review) => { productRating += review.rating });
        product.reviews = reviews;
        product.numOfReviews = product.reviews.length;
        product.rating = productRating / product.reviews.length;
        await product.save();

        res.status(200).json({
            success: true,
            message: "Product Review deleted Successfully",
        })
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        };
    }
})



module.exports = router;
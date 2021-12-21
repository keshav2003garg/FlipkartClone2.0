const express = require('express');
const router = express.Router();

const Order = require('../models/orders.model');
const Product = require('../models/product.model');
const { isAuthenticated, authorizeRoles } = require('../middlewares/authentication');



router.post('/create-order', isAuthenticated, async (req, res) => {
    try {
        const { shippingInfo, orderedItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

        const order = await Order.create({ shippingInfo, orderedItems, user: req.user._id, paymentInfo, paidAt: Date.now(), itemsPrice, taxPrice, shippingPrice, totalPrice });

        res.status(201).json({
            success: true,
            message: "Order Placed Successfully",
            orderInfo: order
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


router.get('/myOrders', isAuthenticated, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });

        res.status(200).json({
            success: true,
            orders: orders
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


router.get('/myOrder-details/:orderId', isAuthenticated, async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).populate("user", "name email");
        if (!order) {
            res.status(404).json({
                success: false,
                message: "Order not Found with this account",
            });
        }

        res.status(200).json({
            success: true,
            orderDetails: order
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


router.get('/admin/get-all-orders', isAuthenticated, authorizeRoles("admin"), async (req, res) => {
    try {
        const order = await Order.find();
        if (!order) {
            res.status(404).json({
                success: false,
                message: "Order not Found",
            });
        }

        let totalAmount = 0;
        order.forEach((order) => { totalAmount += order.totalPrice });

        res.status(200).json({
            success: true,
            totalOrdersAmount: totalAmount,
            allOrders: order
        });
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
})


router.post('/admin/update-order-status/:orderId', isAuthenticated, authorizeRoles("admin"), async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            res.status(404).json({
                success: false,
                message: "Order not Found",
            });
        }

        const currentStatus = order.orderStatus;
        if (currentStatus == "Delivered") {
            res.status(400).json({
                success: false,
                message: "Cannot Update Status. Order already Delivered",
            });
        }
        else {
            const updatedStatus = req.body.status;
            if (updatedStatus == "Delivered") {
                order.delivedAt = Date.now();
                order.orderedItems.forEach(async (order) => {
                    const product = await Product.findById(order.productId);
                    product.stock -= order.quantity;
                    await product.save()
                })
            }
            order.orderStatus = updatedStatus;
            await order.save();

            res.status(200).json({
                success: true,
                message: `Order Status with id "${req.params.orderId}" is successfully updated from ${currentStatus} to ${updatedStatus}`
            });
        }
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        };
    }
})


router.delete('/admin/delete-order/:orderId', isAuthenticated, authorizeRoles("admin"), async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.orderId);
        if (!order) {
            res.status(404).json({
                success: false,
                message: "Order not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: `Order with id "${req.params.orderId}" is successfully deleted`
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



module.exports = router;




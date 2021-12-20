const express = require('express');
const router = express.Router();

const Product = require('../models/product.model');
const productFiltration = require('../utils/productFiltration');
const {isAuthenticated, authorizeRoles} = require('../middlewares/authentication');

router.post('/admin/create', isAuthenticated, authorizeRoles("admin"), async (req, res)=>{
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

router.get('/get', async (req, res)=>{
    try {
        const productFiltering = new productFiltration(Product.find(), req.query).search().filter().pagination(5);
        const products = await productFiltering.products;

        if(!product){
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

router.post('/get-detail/:id', async (req, res)=>{
    try {
        const product = await Product.findById(req.params.id);

        if(!product){
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

router.put('/admin/update/:id', isAuthenticated, authorizeRoles("admin"), async (req, res)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true, useFindAndModify: false});

        if(!product){
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

router.delete('/admin/delete/:id', isAuthenticated, authorizeRoles("admin"), async (req, res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        
        if(!product){
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


module.exports = router;
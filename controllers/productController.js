const mongoose = require('mongoose');
const Product = require('../models/product.model');


const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(200).json({
            status: 'Successful',
            message: "Product created successfully",
            newProduct: newProduct
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        // Send status code 200 and JSON response
        res.status(200).json({
            status: 'Successful',
            message: "Products retrieved successfully",
            products: products,
        });
    } catch (error) {
        // Handle any errors
        res.status(500).json({
            message: error.message
        });
    }
}

const getProduct =  async (req, res) => {
    try {
        const id = req.params.id; // No destructuring needed
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                status: 'Error',
                message: 'Product not found',
            });
        }

        // Send status code 200 and JSON response
        res.status(200).json({
            status: 'Successful',
            message: "Product retrieved successfully",
            product: product,
        });
    } catch (error) {
        // Handle any errors, including invalid ObjectId errors
        res.status(500).json({
            message: error.message
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;

        // If the product with the specified ID does not exist
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                status: 'Fail',
                message: `Product with ID ${id} not found!`,
            });
        }

        // Update the product and return the new updated product
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated product
            runValidators: true, // Ensures the updated data complies with the schema
        });



        res.status(200).json({
            status: 'Successful',
            message: 'Product updated successfully',
            updatedProduct: updatedProduct,
        });

    } catch (error) {
        // Handle any errors
        res.status(500).json({
            message: error.message,
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        // If the product with the specified ID does not exist
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                status: 'Fail',
                message: `Product with ID ${id} not found!`,
            });
        }

        // Update the product and return the new updated product
        const deletedProduct = await Product.findByIdAndDelete(id);



        res.status(200).json({
            status: 'Successful',
            message: 'Product updated successfully',
            deletedProduct: deletedProduct
        });

    } catch (error) {
        // Handle any errors
        res.status(500).json({
            message: error.message,
        });
    }
}


module.exports = {
    createProduct,getProduct,getProducts,updateProduct, deleteProduct
}
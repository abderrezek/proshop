import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

import Product from "../models/product";

// @desc    Fetch all products
// @route   GET /
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  try {
    let q = {
      skip: parseInt(req.query.skip || 0, 0),
      limit: parseInt(req.query.limit || 5, 0),
    };
    let products = await Product.list(q);

    return res.status(200).json(products);
  } catch (err) {
    console.log.bind(
      "Error Controller getProducts in File controllers/products.js:",
      err
    );
    return res.status(400).json(err);
  }
});

// @desc    Fetch single product
// @route   GET /:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    // return res.status(404).json({ message: "Product not found" });
    res.status(404);
    throw new Error("Product Not Found");
  }

  return res.status(200).json(product.toJSON());
});

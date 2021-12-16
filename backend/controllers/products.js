import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

import Product from "../models/product";

// @desc    Fetch all products
// @route   GET /
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  let q = {
    skip: parseInt(req.query.skip || 0, 0),
    limit: parseInt(req.query.limit || 5, 0),
  };
  let products = await Product.list(q);
  const productsLength = await Product.countDocuments((err, count) => count);

  return res
    .status(200)
    .json({ products, pages: Math.ceil(productsLength / q.limit) });
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

// @desc    delete product
// @route   DELETE /:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  await product.remove();
  return res.status(200).json({ message: "Product removed" });
});

// @desc    Create product
// @route   POST /
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  await product.save((err, prd) => {
    if (err) {
      console.log(err);
      return err;
    }
    res.status(201).json(prd);
  });
});

// @desc    Update product
// @route   PUT /:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    numReviews,
    description,
  } = req.body;

  product.name = name;
  product.price = price;
  product.image = image;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;
  product.numReviews = numReviews;
  product.description = description;

  const updatedProduct = await product.save();
  return res.json(updatedProduct);
});

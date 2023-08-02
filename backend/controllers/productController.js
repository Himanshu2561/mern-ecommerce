import asyncHandler from "../middleware/asyncHandler.js";
import productModel from "../models/productModel.js";

// @desc    Fetch all products
// @route   Get /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await productModel.find({});

  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404);
    throw new Error("Data Not Found");
  }
});

// @desc    Fetch a products
// @route   Get /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await productModel.findById(req.params.id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  res.send({ message: "Inside createProduct" });
});

const updateProduct = asyncHandler(async (req, res) => {
  res.send({ message: "Inside updateProduct" });
});

const deleteProduct = asyncHandler(async (req, res) => {
  res.send({ message: "Inside deleteProduct" });
});

const createProductReview = asyncHandler(async (req, res) => {
  res.send({ message: "Inside createProductReview" });
});

const getTopProducts = asyncHandler(async (req, res) => {
  res.send({ message: "Inside getTopProducts" });
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};

import User from "../models/user";
import { Product } from "../models/product";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import {
  NewProductRequestBody,
  getallProduct,
  updatedProductRequestBody,
} from "../types/alltypes";
import { rm } from "fs";

export const newProduct = async (
  req: Request<{}, {}, NewProductRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { name, price, stock, category } = req.body;
  const photo = req.file;
  try {
    if (!name || !price || !stock || !category || !photo) {
      return next(new ErrorHandler("Please add all fields", 400));
    }
    const newProduct = new Product({
      name,
      price,
      stock,
      category,
      photo: photo.path,
    });
    const createProduct = newProduct.save();
    return res.status(200).json({
      createProduct,
      message: `Product Created Success`,
    });
  } catch (error) {
    res.status(400).json();
  }
};

export const getAllProducts = async (
  req: Request<{}, {}, getallProduct>,
  res: Response,
  next: NextFunction
) => {
  // const { search, price, sort, category } = req.body;
  const search = req.query.search || "";
  const price = req.query.price || "";
  const sort = req.query.sort || "asc";
  const category = req.query.category || "";
  const page = Number(req.query.page) || 1;
  const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
  const skip = (page - 1) * limit;
  try {
    const products = await Product.find({
      name: { $regex: search, $options: "i" },
      price: { $lte: price },category:category
    }).sort(sort && { price: sort === "asc" ? 1 : -1 })
    .limit(limit)
    .skip(skip);
    return res.status(200).json({
      products,
      message: `AllProduct Success`,
    });
  } catch (error) {
    res.status(400).json();
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name, price, stock, category } = req.body;
  const photo = req.file;
  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  if (photo) {
    rm(product.photo!, () => {
      console.log("Old Photo Deleted");
    });
    product.photo = photo.path;
  }

  if (name) product.name = name;
  if (price) product.price = price;
  if (stock) product.stock = stock;
  if (category) product.category = category;

  await product.save();

  return res.status(200).json({
    success: true,
    message: "Product Updated Successfully",
  });
};

export const getlatestProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const latestProducts = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(5);
    return res.status(200).json({
      latestProducts,
      message: `top 5 latest product`,
    });
  } catch (error) {
    res.status(400).json();
  }
};

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allCategories = await Product.distinct("category");
    return res.status(200).json({
      allCategories,
      message: `all categories success`,
    });
  } catch (error) {
    res.status(400).json();
  }
};

export const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const singleProduct = await Product.findById(id);
    return res.status(200).json({
      singleProduct,
      message: `single product ${singleProduct}`,
    });
  } catch (error) {
    res.status(400).json();
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const deleteProduct = await Product.findByIdAndDelete(id);
    return res.status(200).json({
      deleteProduct,
      message: `product delete success`,
    });
  } catch (error) {
    res.status(400).json();
  }
};

export const getAdminProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allProducts = await Product.find({});
    return res.status(200).json({
      allProducts,
      message: `all products success`,
    });
  } catch (error) {
    res.status(400).json();
  }
};

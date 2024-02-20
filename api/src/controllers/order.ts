import { Order } from "../models/order";
import User from "../models/user";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { NewOrderRequestBody } from "../types/alltypes";
import { Product } from "../models/product";

export const newOrder = async (
  req: Request<{}, {}, NewOrderRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const {
    shippingInfo,
    orderItems,
    user,
    subtotal,
    tax,
    shippingCharges,
    discount,
    total,
  } = req.body;

  if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !total)
    return next(new ErrorHandler("Please Enter All Fields", 400));

  const order = await Order.create({
    shippingInfo,
    orderItems,
    user,
    subtotal,
    tax,
    shippingCharges,
    discount,
    total,
  });

  for (let i = 0; i < order.orderItems.length; i++) {
    const orderItem = orderItems[i];
    const product = await Product.findById(orderItem.productId);
    if (!product) throw new Error("Product Not Found");
    product.stock -= orderItem.quantity;
  }

  await order.save();
  return res.status(201).json({
    success: true,
    message: "Order Placed Successfully",
  });
};



export const getSingleOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const singleOrder = await Order.findById(id);
    return res.status(200).json({
      singleOrder,
      message: `single Order ${singleOrder}`,
    });
  } catch (error) {
    res.status(400).json();
  }
};


export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const deleteOrder = await Order.findByIdAndDelete(id)
    return res.status(200).json({
      deleteOrder,
      message: `Order delete success`,
    });
  } catch (error) {
    res.status(400).json();
  }
};

export const allOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allOrder = await Product.find().populate("user", "name")
    return res.status(200).json({
      allOrder,
      message: `all orders found: ${allOrder}`,
    });
  } catch (error) {
    res.status(400).json();
  }
};

export const myOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userid = req.params.id;
  try {
    const myOrders = await Order.findById({user: userid}).populate("user", "name")
    return res.status(200).json({
      myOrders,
      message: `My All Orders ${myOrders}`,
    });
  } catch (error) {
    res.status(400).json();
  }
};

export const processOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const order = await Order.findById(id);

    if (!order) return next(new ErrorHandler("Order Not Found", 404));
  
    switch (order.status) {
      case "Processing":
        order.status = "Shipped";
        break;
      case "Shipped":
        order.status = "Delivered";
        break;
      default:
        order.status = "Delivered";
        break;
    }
    await order.save()
    return res.status(200).json({
      order,
      message: `Order status ${order}`,
    });
  } catch (error) {
    res.status(400).json();
  }
};
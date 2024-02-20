import User from "../models/user";
import { Product } from "../models/product";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { newCpuponCode } from "../types/alltypes";
import { Coupon } from "../models/coupon";
import { stripe } from "../index";

export const createPaymentIntent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { amount } = req.body;

  if (!amount) return next(new ErrorHandler("Please enter amount", 400));

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(amount) * 100,
    currency: "pkr",
  });

  return res.status(201).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  });
};

export const newCoupon = async (
  req: Request<{}, {}, newCpuponCode>,
  res: Response,
  next: NextFunction
) => {
  const { code, amount } = req.body;
  try {
    if (!code || !amount) {
      return next(new ErrorHandler("Please add all fields", 400));
    }
    const newCoupon = new Coupon({
      code,
      amount,
    });
    const createCoupon = newCoupon.save();
    return res.status(200).json({
      createCoupon,
      message: `Coupon Created Success`,
    });
  } catch (error) {
    res.status(400).json();
  }
};

export const allCoupons = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allCoupon = await Coupon.find();
    return res.status(200).json({
      allCoupon,
      message: `all coupon success`,
    });
  } catch (error) {
    res.status(400).json();
  }
};

export const deleteCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const deleteCoupon = await Coupon.findByIdAndDelete(id);
    return res.status(200).json({
      deleteCoupon,
      message: `Coupon delete success`,
    });
  } catch (error) {
    res.status(400).json();
  }
};

export const applyDiscount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { coupon } = req.query;

  const discount = await Coupon.findOne({ code: coupon });

  if (!discount) return next(new ErrorHandler("Invalid Coupon Code", 400));

  return res.status(200).json({
    success: true,
    discount: discount.amount,
  });
};

import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler";
import User from "../models/user";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
      interface Request {
          user? : Record<string,any>
      }
  }
}

export const isAuthenticated = async (req:Request , res:Response, next:NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) return next(new ErrorHandler("Not Logged In", 401));
  jwt.verify(token, process.env.JWT_SECRET || '', (err:any, user:any) => {
    if (err) return next(new ErrorHandler("Forbidden",401)); 
    req.user = user;
    next();
  });
}

export const adminOnly = async (req:Request , res:Response, next:NextFunction) => {
  // const { id } = req.query;

  // if (!id) return next(new ErrorHandler("Saale Login Kr phle", 401));

  // const user = await User.findById(id);
  // if (!user) return next(new ErrorHandler("Saale Fake ID Deta Hai", 401));
  if (req.user?.role !== "admin")
    return next(new ErrorHandler("Saale Aukat Nhi Hai Teri", 403));
  next();
}


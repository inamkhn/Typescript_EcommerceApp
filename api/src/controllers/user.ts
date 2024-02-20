import User from "../models/user";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { NewUserRequestBody,LoginUserRequestBody } from "../types/alltypes";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const newUser = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, gender, dob } = req.body;
  const photo = req.file;
  try {
    if ( !name || !email || !gender || !dob || !password || !photo ) {     
      return next(new ErrorHandler("Please add all fields", 400));
    }

    let user = await User.findOne({ email });
    if (user)
      return res.status(200).json({
        success: true,
        message: `Welcome, ${user.name}`,
      });
    const hashpassword = await bcryptjs.hashSync(password, 10);
    const newUser = new User({
      name,
      email,
      gender,
      dob,
      photo:photo.path,
      password: hashpassword,
    });
    const createUser = newUser.save();
    return res.status(200).json({
      createUser,
      message: `User Created Success`,
    });
  } catch (error) {
    res.status(400).json();
  }
};

interface UserDocument extends Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  gender: "male" | "female";
  dob: Date;
  photo?: string;
}

export const loginUser = async (
  req: Request<{}, {}, LoginUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const {email, password } = req.body;
  try {
    if (!email || !password) {
      return next(new ErrorHandler("Please add all fields", 400));
    }
    let user: UserDocument & { _doc: unknown } | null = await User.findOne({ email });
    if(!user){
      return next(new ErrorHandler("email password incorrect", 400));
    }
    const comparePassword = await bcryptjs.compareSync(password, user.password)
    if(!comparePassword){
      return next(new ErrorHandler("email password incorrect", 400));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '');
    // const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(user);
    return res.status(200).json({
      user,
      message: `User Login success`,
    });
  } catch (error) {
    res.status(400).json();
  }
};

export const getUser = async (req:Request, res:Response, next:NextFunction) => {
  const id  = req.params.id
  try {
    let user: UserDocument & { _doc: unknown } | null = await User.findById(id);
  
    if (!user) return next(new ErrorHandler('User not found!',404));
  
    // const { password: pass, ...rest } = user._doc;
  
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req:Request, res:Response, next:NextFunction) => {
  try {
    let users = await User.find({});
  
    if (!users) return next(new ErrorHandler('Users not found!',404));
  
    // const { password: pass, ...rest } = user._doc;
  
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req:Request, res:Response, next:NextFunction) => {
  // if (req.user.id !== req.params.id
  //   return next(errorHandler(401, "You can only delete your own account!"));
  const id  = req.params.id
  try {
    await User.findByIdAndDelete(id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};


// export const signOut = async (req:Request, res:Response, next:NextFunction) => {
//   try {
//     res.clearCookie('access_token');
//     res.status(200).json('User has been logged out!');
//   } catch (error) {
//     next(error);
//   }
// };
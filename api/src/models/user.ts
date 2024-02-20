import mongoose from "mongoose";
import validator from 'validator';

interface IUSER {
  _id:string
  name:string
  email:string
  password:string
  role:"admin"|"user"
  createdAt:Date
  updatedAt:Date
  photo:string
  gender:"male"|"female"
  dob:Date
  age:number
}

const schema = new mongoose.Schema(
    {
      // _id: {
      //   type: String,
      //   required: [true, "Please enter ID"],
      // },
      name: {
        type: String,
        required: [true, "Please enter Name"],
      },
      email: {
        type: String,
        unique: [true, "Email already Exist"],
        required: [true, "Please enter Name"],
        validate: validator.default.isEmail,
      },
      password: {
        type: String,
        required: [true, "Please enter password"],
      },
      photo: {
        type: String,
        // required: [true, "Please add Photo"],
      },
      role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
      },
      gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "Please enter Gender"],
      },
      dob: {
        type: Date,
        required: [true, "Please enter Date of birth"],
      },
    },
    {
      timestamps: true,
    }
  );

  export default mongoose.model("User",schema)
import express from "express";
// import { connectDB } from "./utils/db.js";
// import { errorMiddleware } from "./middlewares/error.js";
// import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";
import Stripe from "stripe";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

// Importing Routes
import userRoute from "./routes/user";
import productRoute from "./routes/products";
// import orderRoute from "./routes/order.js";
// import paymentRoute from "./routes/payment.js";
// import dashboardRoute from "./routes/stats.js";

config({
  path: "./.env",
});

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";

export const stripe = new Stripe(stripeKey);
// export const myCache = new NodeCache();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("API Working with /api/v1");
});

// Using Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
// app.use("/api/v1/order", orderRoute);
// app.use("/api/v1/payment", paymentRoute);
// app.use("/api/v1/dashboard", dashboardRoute);

app.use("/uploads", express.static("uploads"));
// app.use(errorMiddleware);

const connectDB = async ()=>{
  const {connection} = await mongoose.connect(process.env.MONGO_URI || '')
  console.log(`Mongodb connected with ${connection.host}`)
 }

app.listen(port, () => {
  connectDB()
  console.log(`Express is working on http://localhost:${port}`);
});
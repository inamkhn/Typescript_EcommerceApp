import express from "express";
// import { adminOnly } from "../middlewares/auth.js";
import {
  allOrders,
  deleteOrder,
  getSingleOrder,
  myOrders,
  newOrder,
  processOrder,
} from "../controllers/order.js";

const app = express.Router();

// route - /api/v1/order/new
app.post("/new", newOrder);

// // route - /api/v1/order/my
app.get("/my", myOrders);

// // route - /api/v1/order/my
app.get("/all", allOrders); //adminOnly

app
  .route("/:id")
  .get(getSingleOrder)
  .put(processOrder) //adminOnly
  .delete(deleteOrder);  //adminOnly

export default app;

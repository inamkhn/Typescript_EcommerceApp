import express from "express";
// import { adminOnly } from "../middlewares/auth";
import {newProduct,getlatestProducts,getAllCategories,updateProduct,
    deleteProduct,getSingleProduct,getAdminProducts,getAllProducts} from "../controllers/products";
import {sigleUpload} from "../middlewares/multer"

const app = express.Router();

//To Create New Product  - /api/v1/product/new
app.post("/new", sigleUpload, newProduct); //adminOnly,

// //To get all Products with filters  - /api/v1/product/all
app.get("/all", getAllProducts);

// //To get last 10 Products  - /api/v1/product/latest
app.get("/latest", getlatestProducts);

// //To get all unique Categories  - /api/v1/product/categories
app.get("/categories", getAllCategories);

// //To get all Products   - /api/v1/product/admin-products
app.get("/admin-products", getAdminProducts); //adminOnly

// // To get, update, delete Product
app
  .route("/:id")
  .get(getSingleProduct)
  .put(sigleUpload, updateProduct) //adminOnly
  .delete(deleteProduct);   //adminOnly

export default app;
import express from "express";
import {newUser,loginUser,getUser,getAllUsers,deleteUser} from "../controllers/user";
import { adminOnly,isAuthenticated } from "../middlewares/auth";
import {sigleUpload} from "../middlewares/multer"

const app = express.Router();

// route - /api/v1/user/new
app.post("/new",sigleUpload,newUser);
app.post("/login",loginUser);

// Route - /api/v1/user/all
app.get("/all",isAuthenticated,getAllUsers); //adminOnly,

// Route - /api/v1/user/dynamicID
app.route("/:id").get(getUser).delete(deleteUser);  //adminOnly,

export default app;

import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import routerUser from "./routers/user";
import routerProduct from "./routers/product";
import routerService from "./routers/service";
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
//monggo
async function connectDB(uri) {
  try {
    await mongoose.connect(uri);
    console.log(`Kết Nối Thành Công`);
  } catch (error) {
    console.log(`Kết Nối Thất Bại`);
  }
}
connectDB(`mongodb://localhost:27017/DATN_WD_160`);
//router
app.use("/api/", routerUser);
app.use("/api/", routerProduct);
app.use("/api/",routerService);
export const viteNodeApp = app;
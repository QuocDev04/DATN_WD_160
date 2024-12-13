
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import routerUser from "./routers/user";
import routerProduct from "./routers/product";
import routerService from "./routers/service";
import routerRoom from "./routers/room";
import routerCategory from "./routers/category";
import routerCategoryProduct from "./routers/categoryProduct";
import routerBoongking from "./routers/boongking";
import routerBynow from "./routers/bynow";
import routerCmt from "./routers/cmt";
import routerArticle from "./routers/article";
import routerDashboad from "./routers/dashboad";
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
app.use("/api/", routerService);
app.use("/api/", routerRoom);
app.use("/api/", routerCategory);
app.use("/api/", routerCategoryProduct);
app.use("/api/", routerBoongking);
app.use("/api/", routerBynow);
app.use("/api/", routerCmt);
app.use("/api/", routerArticle);
app.use("/api/", routerDashboad);
export const viteNodeApp = app;
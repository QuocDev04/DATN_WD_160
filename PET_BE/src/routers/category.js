import express from "express";
import { del, getAll, getId, post, put } from "../controllers/category";
const router = express.Router();
router.get('/category', getAll)
router.get('/category/:id', getId)
router.post('/category', post)
router.put("/category/:id", put);
router.delete("/category/:id", del);
export default router;

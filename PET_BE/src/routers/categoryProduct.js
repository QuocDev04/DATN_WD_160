import express from "express";
import { del, getAll, getId, post, put } from "../controllers/categoryProduct";
const router = express.Router();
router.get('/categoryProduct', getAll)
router.get('/categoryProduct/:id', getId)
router.post('/categoryProduct', post)
router.put("/categoryProduct/:id", put);
router.delete("/categoryProduct/:id", del);
export default router;

import express from "express";
import { del, getAll, getId, post, put } from "../controllers/article";
const router = express.Router();
router.get('/article',getAll)
router.get('/article/:id', getId)
router.post('/article', post)
router.put("/article/:id", put);
router.delete("/article/:id", del);
export default router;

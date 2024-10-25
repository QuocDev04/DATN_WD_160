import express from "express";
import { } from "../controllers/user";
import { delIdProduct, getAllProduct, getIdProduct, postProduct, putProduct } from "../controllers/product";
const router = express.Router();
router.get('/product', getAllProduct)
router.get('/product/:id', getIdProduct)
router.post('/product', postProduct)
router.put("/product/:id", putProduct);
router.delete("/product/:id", delIdProduct);
export default router;

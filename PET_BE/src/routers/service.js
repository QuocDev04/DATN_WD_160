import express from "express";
import { getAllProduct } from "../controllers/product";
import { delIdService, getAIDService, postService, PutService } from "../controllers/service";
const router = express.Router();
router.get('/service', getAllProduct)
router.get('/service/:id', getAIDService)
router.post('/service', postService)
router.put("/service/:id", PutService);
router.delete("/service/:id", delIdService);
export default router;

import express from "express";
import { delIdService, getAIDService, getAllService, postService, PutService } from "../controllers/service";
const router = express.Router();
router.get('/service', getAllService)
router.get('/service/:id', getAIDService)
router.post('/service', postService)
router.put("/service/:id", PutService);
router.delete("/service/:id", delIdService);
export default router;

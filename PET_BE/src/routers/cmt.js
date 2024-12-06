import { Router } from "express";
import { postComment, getAllComment, getIdComment } from "../controllers/evaluate";
const router = Router();
router.post('/evaluate', postComment)
router.get('/evaluate', getAllComment)
router.get('/evaluate/:roomId', getIdComment)
export default router;

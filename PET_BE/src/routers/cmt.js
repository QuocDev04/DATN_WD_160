import { Router } from "express";
import { postComment, getAllComment, getIdComment, delComment, putComment } from "../controllers/evaluate";
const router = Router();
router.post('/evaluate', postComment)
router.get('/evaluate', getAllComment)
router.get('/evaluate/:roomId', getIdComment)
router.delete('/evaluate/:id', delComment)
router.put('/evaluate/:id', putComment)
export default router;

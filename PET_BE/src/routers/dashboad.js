import { Router } from "express";
import { getAll } from "../controllers/dashboad";
const router = Router();
router.get('/dashboad', getAll)
export default router;

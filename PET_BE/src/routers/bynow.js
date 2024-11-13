import { Router } from "express";
import { buyNow, getByUserId } from "../controllers/bynow";





const router = Router()
router.post("/buynow", buyNow);
router.get("/buynow/:userId/:_id",getByUserId );
export default router
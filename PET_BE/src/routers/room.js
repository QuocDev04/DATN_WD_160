import express from "express";
import { getAllRoom } from "../controllers/room";
const router = express.Router();
router.get('/room', getAllRoom)

export default router;

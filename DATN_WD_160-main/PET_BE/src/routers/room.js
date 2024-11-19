import express from "express";
import { delRoom, getAllRoom, getIdRoom, postRoom, putRoom } from "../controllers/room";
const router = express.Router();
router.get('/room', getAllRoom)
router.get('/room/:id', getIdRoom)
router.put('/room/:id', putRoom)
router.post('/room', postRoom)
router.delete('/room/:id', delRoom)

export default router;

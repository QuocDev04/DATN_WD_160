import express from "express";
import { delIdUser, getAllUser, getIdUser, putIdUser, register, signin } from "../controllers/user";
const router = express.Router();
router.get('/user', getAllUser)
router.get('/user/:id', getIdUser)
router.put("/user/:id", putIdUser);
router.delete("/user/:id", delIdUser);
router.post("/signup", register);
router.post("/signin", signin);
export default router;

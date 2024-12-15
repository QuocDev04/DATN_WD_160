import express from "express";
import { delIdUser, forgotPassword, getAllUser, getIdUser, putIdUser, register, resetPassword, signin } from "../controllers/user";
const router = express.Router();
router.get('/user', getAllUser)
router.get('/user/:id', getIdUser)
router.put("/user/:id", putIdUser);
router.delete("/user/:id", delIdUser);
router.post("/signup", register);
router.post("/signin", signin);
router.post('/forgot-password', forgotPassword); // Route cho quên mật khẩu
router.post('/reset-password', resetPassword); 
export default router;

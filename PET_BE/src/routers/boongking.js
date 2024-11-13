import express from "express";
import { BookingRoom, getBookingroom } from "../controllers/booking";
const router = express.Router();
router.post('/bookingroom', BookingRoom)
router.get('/bookingroom', getBookingroom)


export default router;

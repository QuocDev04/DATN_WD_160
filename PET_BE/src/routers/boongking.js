import express from "express";
import { BookingRoom, getBookingroom, updateBookingRoomStatus } from "../controllers/booking";
const router = express.Router();
router.post('/bookingroom', BookingRoom)
router.get('/bookingroom', getBookingroom)
router.patch('/bookingroom/:_id/status', updateBookingRoomStatus)


export default router;

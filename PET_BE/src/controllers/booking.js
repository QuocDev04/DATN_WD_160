import Bookingroom from "../models/bookingroom";
import { StatusCodes } from "http-status-codes";
import BuyNow from "../models/buynow"
export const BookingRoom = async (req, res) => {
    const {
        userId,
        paymentMethod,
        petName,
        lastName,
        age,
        weight,
        phone,
        totalPrice,
        species,
        gender,
        height,
        checkindate,
        checkoutdate,
        orderNotes,
        buyNowOrder
    } = req.body;

    try {
        // Kiểm tra số phòng đã đặt của người dùng
        const existingBookings = await Bookingroom.find({ userId });
        const totalRoomsBooked = existingBookings.reduce((total, booking) => total + booking.items.length, 0);

        if (totalRoomsBooked >= 2) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "You cannot book more than 2 rooms."
            });
        }

        // Lấy thông tin BuyNowOrder
        const buyNowOrderData = await BuyNow.findById(buyNowOrder).populate('items.roomId');
        if (!buyNowOrderData) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Buy Now Order not found" });
        }

        // Chuẩn bị dữ liệu các phòng đặt
        const BookingRoomItems = buyNowOrderData.items.map(item => ({
            roomId: item.roomId._id,
            name: item.roomId.roomName,
            gallery: item.roomId.roomgallely[0],
            price: item.roomprice,
        }));

        // Tạo đơn đặt phòng
        const OrderRoom = await Bookingroom.create({
            userId,
            items: BookingRoomItems,
            paymentMethod,
            phone,
            petName,
            lastName,
            age,
            weight,
            species,
            gender,
            height,
            totalPrice,
            checkindate,
            checkoutdate,
            orderNotes
        });

        return res.status(StatusCodes.CREATED).json(OrderRoom);
    } catch (error) {
        console.error("Error in BookingRoom: ", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
export const getBookingroom = async (req, res) => {
    try {
        const order = await Bookingroom.find().populate({
            path: "items.roomId",
            select: "roomName roomprice roomgallely" // Chỉ lấy các trường cần thiết
        });
        return res.status(StatusCodes.OK).json(order);
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
    }
};
export const getOrderById = async (req, res) => {
    try {
        const { userId, _id } = req.params;
        const order = await BuyNow.findOne({ userId, _id })
        if (!order) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: "Order not found" });
        }
        return res.status(StatusCodes.OK).json(order);
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
    }
};
export const updateOrder = async (req, res) => {
    try {
        const { roomId } = req.params;
        const order = await BuyNow.findOneAndUpdate({ _id: roomId }, req.body, {
            new: true,
        });
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Order not found" });
        }
        return res.status(StatusCodes.OK).json(order);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
export const updateBookingRoomStatus = async (req, res) => {
    try {
        const { _id } = req.params;
        const { status } = req.body;

        // Danh sách các trạng thái hợp lệ
        const validStatus = ["pending", "confirmed", "completed", "cancelled"];

        // Kiểm tra trạng thái hợp lệ
        if (!validStatus.includes(status)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid status" });
        }

        // Tìm đơn đặt phòng theo `bookingId`
        const bookingRoom = await Bookingroom.findById(_id);
        if (!bookingRoom) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Booking not found" });
        }

        // Kiểm tra không cho phép chuyển từ trạng thái 'cancelled' hoặc 'confirmed' sang 'pending'
        if ((bookingRoom.status === "cancelled" || bookingRoom.status === "confirmed") && status === "pending") {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Cannot change status to 'pending' from 'cancelled' or 'confirmed'" });
        }

        // Cập nhật trạng thái mới
        bookingRoom.status = status;
        await bookingRoom.save();

        // Trả về phản hồi thành công
        return res.status(StatusCodes.OK).json({ message: "Booking status updated successfully" });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

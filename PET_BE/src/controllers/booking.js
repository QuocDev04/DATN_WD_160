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
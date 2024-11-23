import Bookingroom from "../models/bookingroom";
import { StatusCodes } from "http-status-codes";
import BuyNow from "../models/buynow"
import Service from "../models/services"
export const BookingRoom = async (req, res) => {
    const {
        userId,
        paymentMethod,
        service,
        petName,
        lastName,
        age,
        weight,
        phone,
        species,
        gender,
        height,
        checkindate,
        checkoutdate,
        orderNotes,
        buyNowOrder
    } = req.body;

    try {
        let BookingRoomItems = [];
        let totalPrice = 0;

        // Lấy thông tin "Buy Now Order"
        const buyNowOrderData = await BuyNow.findById(buyNowOrder).populate('items.roomId');
        if (!buyNowOrderData) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Buy Now Order not found" });
        }

        // Tính tổng giá phòng
        BookingRoomItems = buyNowOrderData.items.map(item => {
            if (typeof item.roomprice === "number" && !isNaN(item.roomprice)) {
                totalPrice += item.roomprice; // Thêm giá phòng hợp lệ vào tổng giá
            }
            return {
                roomId: item.roomId._id,
                name: item.roomId.roomName,
                gallery: item.roomId.roomgallely[0],
                price: item.roomprice,
            };
        });

        // Tính tổng giá dịch vụ
        if (Array.isArray(service) && service.length > 0) {
            const serviceData = await Service.find({ '_id': { $in: service } });
            serviceData.forEach(serviceItem => {
                if (typeof serviceItem.priceService === "number" && !isNaN(serviceItem.priceService)) {
                    totalPrice += serviceItem.priceService; // Thêm giá dịch vụ hợp lệ vào tổng giá
                }
            });
        }

        // Kiểm tra tổng giá trị cuối cùng
        if (isNaN(totalPrice) || totalPrice <= 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Total price calculation is invalid." });
        }
        // Kiểm tra số phòng đã đặt trong ngày
        const startOfDay = new Date(checkindate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(checkindate);
        endOfDay.setHours(23, 59, 59, 999);

        const bookingsToday = await Bookingroom.find({
            userId,
            checkindate: { $gte: startOfDay, $lte: endOfDay }
        });

        const totalRoomsToday = bookingsToday.reduce((total, booking) => total + booking.items.length, 0);
        const roomsToAdd = BookingRoomItems.length;

        if (totalRoomsToday + roomsToAdd > 2) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Bạn chỉ có thể đặt tối đa 2 phòng trong một ngày và nếu quý khách muốn đặt thêm phòng vui lòng gọi điện tới số hotline: 0906969696 hoặc có thể mang thú cưng tới và làm thủ tục tại cửa hàng."
            });
        }
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
            orderNotes,
            service
        });

        return res.status(StatusCodes.CREATED).json(OrderRoom);
    } catch (error) {
        console.error("Error in createOrder: ", error);
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
        const { userId } = req.params;
        const order = await Bookingroom.find({ userId})
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

        // Danh sách trạng thái hợp lệ
        const VALID_STATUS = ["pending", "confirmed", "cancelled"];

        // Kiểm tra trạng thái hợp lệ
        if (!VALID_STATUS.includes(status)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid status" });
        }

        // Tìm đơn đặt phòng theo ID
        const bookingRoom = await Bookingroom.findById(_id);
        if (!bookingRoom) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Booking not found" });
        }

        // Kiểm tra không cho phép thay đổi trạng thái từ 'cancelled' hoặc 'confirmed'
        if (bookingRoom.status === "cancelled" || bookingRoom.status === "confirmed") {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: `Cannot change status from '${bookingRoom.status}' as it is already finalized`
            });
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


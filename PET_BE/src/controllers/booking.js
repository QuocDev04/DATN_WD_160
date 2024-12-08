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
        let roomPrice = 0;
        let servicePrice = 0;

        // Lấy thông tin "Buy Now Order"
        const buyNowOrderData = await BuyNow.findById(buyNowOrder).populate({
            path: 'items.roomId',
            select: 'roomName roomprice roomgallely' // Đảm bảo lấy trường roomprice
        });

        if (!buyNowOrderData) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Buy Now Order not found" });
        }

        // Tính số giờ lưu trú
        const checkIn = new Date(checkindate);
        const checkOut = new Date(checkoutdate);
        const timeStayInHours = Math.max(1, Math.round((checkOut - checkIn) / (1000 * 60 * 60)));
        console.log('Số giờ lưu trú:', timeStayInHours);

        // Tính tổng giá phòng
        if (buyNowOrderData && Array.isArray(buyNowOrderData.items)) {
            BookingRoomItems = buyNowOrderData.items.map(item => {
                if (item.roomId) {
                    const roomPriceValue = item.roomId.roomprice;
                    console.log('Giá phòng mỗi giờ:', roomPriceValue);
                    
                    if (typeof roomPriceValue === "number" && !isNaN(roomPriceValue)) {
                        const currentRoomPrice = roomPriceValue * timeStayInHours;
                        console.log(`Phép tính: ${roomPriceValue} × ${timeStayInHours} = ${currentRoomPrice}`);
                        roomPrice += currentRoomPrice;
                    }
                    return {
                        roomId: item.roomId._id,
                        name: item.roomId.roomName,
                        gallery: item.roomId.roomgallely[0],
                        price: roomPriceValue * timeStayInHours,
                    };
                } else {
                    console.error('roomId is undefined for item:', item);
                    return null;
                }
            }).filter(item => item !== null);
        } else {
            console.error('buyNowOrderData.items is not an array or is undefined');
        }
        console.log('Tổng giá phòng:', roomPrice);

        // Tính tổng giá dịch vụ
        if (Array.isArray(service) && service.length > 0) {
            const serviceData = await Service.find({ '_id': { $in: service } });
            serviceData.forEach(serviceItem => {
                if (typeof serviceItem.priceService === "number" && !isNaN(serviceItem.priceService)) {
                    servicePrice += serviceItem.priceService;
                }
            });
        }
        console.log('Tổng giá dịch vụ:', servicePrice);

        // Tính tổng giá cuối cùng
        totalPrice = roomPrice + servicePrice;
        console.log('Tổng giá cuối cùng:', totalPrice);

        // Kiểm tra tổng giá trị cuối cùng
        if (isNaN(totalPrice) || totalPrice <= 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ 
                error: "Total price calculation is invalid.",
                details: {
                    roomPrice,
                    servicePrice,
                    totalPrice
                }
            });
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
        const order = await Bookingroom.find({ userId}).populate({
            path: "items.roomId",
            select: "roomName roomprice roomgallely" // Chỉ lấy các trường cần thiết
        });
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
        const { status, cancelReason } = req.body;

        const VALID_STATUS = ["pending", "confirmed", "cancelled", "completed"];

        if (!VALID_STATUS.includes(status)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid status" });
        }

        const bookingRoom = await Bookingroom.findById(_id);
        if (!bookingRoom) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Booking not found" });
        }

        // Kiểm tra nếu trạng thái hiện tại là cancelled hoặc completed
        if (bookingRoom.status === "cancelled" || bookingRoom.status === "completed") {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: `Cannot change status from '${bookingRoom.status}' as it is already finalized`
            });
        }

        bookingRoom.status = status;
        if (status === "cancelled") {
            bookingRoom.cancelReason = cancelReason;
        }
        await bookingRoom.save();

        return res.status(StatusCodes.OK).json({ 
            message: "Booking status updated successfully",
            cancelReason: status === "cancelled" ? cancelReason : undefined
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};


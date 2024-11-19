import Bookingroom from "../models/bookingroom";
import { StatusCodes } from "http-status-codes";
import BuyNow from "../models/buynow"
export const BookingRoom = async (req, res) => {
    const { userId, paymentMethod, petName, lastName, age, weight, phone, totalPrice, species, gender, height, checkindate, checkoutdate, orderNotes, buyNowOrder } = req.body
    try {
        // Kiểm tra số lượng đặt phòng hiện tại của user
        const existingBookings = await Bookingroom.find({ 
            userId,
            checkindate: { $lte: checkoutdate },
            checkoutdate: { $gte: checkindate }
        });

        // Lấy số phòng trong đơn đặt hiện tại
        const buyNowOrderData = await BuyNow.findById(buyNowOrder).populate('items.roomId');
        if (!buyNowOrderData) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Buy Now Order not found" });
        }

        const newBookingRoomCount = buyNowOrderData.items.length;
        const totalRooms = existingBookings.length + newBookingRoomCount;

        // Kiểm tra tổng số phòng sau khi đặt thêm
        if (totalRooms > 2) {
            return res.status(StatusCodes.BAD_REQUEST).json({ 
                error: `Không thể đặt thêm ${newBookingRoomCount} phòng. Bạn đã đặt ${existingBookings.length} phòng và chỉ có thể đặt tối đa 2 phòng trong cùng một ngày nếu quý khách muốn đặt thêm phòng vui lòng gọi điện tới số hotline: 0906969696 hoặc có thể mang thú cưng tới và làm thủ tục tại cửa hàng.` 
            });
        }

        let BookingRoomItems = [];
        BookingRoomItems = buyNowOrderData.items.map(item => ({
            roomId: item.roomId._id,
            name: item.roomId.roomName,
            gallery: item.roomId.roomgallely[0],
            price: item.roomprice,
        }));
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
        })
        return res.status(StatusCodes.CREATED).json(OrderRoom);
    } catch (error) {
        console.error("Error in createOrder: ", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}
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
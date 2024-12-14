import Bookingroom from "../models/bookingroom";
import { StatusCodes } from "http-status-codes";
import BuyNow from "../models/buynow"
import Service from "../models/services"
import { sendMail } from "./sendmail";
import moment from 'moment-timezone';

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
        buyNowOrder,
        email
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
        // Kiểm tra số đơn đã đặt trong ngày
        const startOfDay = new Date(checkindate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(checkindate);
        endOfDay.setHours(23, 59, 59, 999);

        const bookingsToday = await Bookingroom.find({
            userId,
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        });

        // Kiểm tra số lượng đơn đặt
        if (bookingsToday.length >= 2) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Bạn chỉ có thể đặt tối đa 2 đơn trong một ngày. Vui lòng thử lại sau."
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
            service,
            email
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
        const order = await Bookingroom.find({ userId }).populate({
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
        const { status, cancelReason, email } = req.body;

        // Kiểm tra trạng thái hợp lệ
        if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid status" });
        }

        const bookingRoom = await Bookingroom.findById(_id);
        if (!bookingRoom) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Booking not found" });
        }

        // Kiểm tra nếu trạng thái hiện tại là "cancelled" hoặc "completed"
        if (["cancelled", "completed"].includes(bookingRoom.status)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: `Cannot change status from '${bookingRoom.status}' as it is already finalized.`
            });
        }

        // Tự động hủy phòng nếu quá thời gian nhận phòng + 30 phút
        const currentTime = new Date();
        const checkInTime = new Date(bookingRoom.checkindate);
        const cancelTime = new Date(checkInTime.getTime() + 30 * 60 * 1000);

        if (bookingRoom.status === "confirmed" && currentTime >= cancelTime) {
            bookingRoom.status = "cancelled"; // Đặt trạng thái là "cancelled"
            await bookingRoom.save();
            return res.status(StatusCodes.OK).json({
                message: "Phòng đã được tự động hủy do quá thời gian nhận phòng 30 phút."
            });
        }   

        // Cập nhật trạng thái và lý do hủy (nếu có) 
        bookingRoom.status = status;
        if (status === "cancelled") {
            if (!cancelReason) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: "Cancel reason is required when cancelling." });
            }
            bookingRoom.cancelReason = cancelReason;
        }
        await bookingRoom.save();

        // Gửi email thông báo theo trạng thái
        if (status !== "cancelled" && email) {
            const emailSubject = `Trạng thái đặt phòng: ${status}`;
            let emailContent = "";

            switch (status) {
                case "pending":
                    emailContent = `
                        <div style="font-family: Arial, sans-serif; color: #333;">
                            <h2>Đơn đặt phòng đang chờ xử lý</h2>
                            <p>Chúng tôi đã nhận được yêu cầu đặt phòng của bạn. Vui lòng đợi xác nhận từ hệ thống.</p>
                        </div>`;
                    break;
                case "confirmed":
                    const emailNotifyTime = new Date(checkInTime.getTime() - 15 * 60 * 1000);
                    const emailReminderTime = new Date(checkInTime.getTime() + 15 * 60 * 1000);
                    const emailCancelTime = new Date(checkInTime.getTime() + 30 * 60 * 1000);

                    if (currentTime >= emailNotifyTime && currentTime < emailReminderTime) {
                        emailContent = `
                            <div style="font-family: Arial, sans-serif; color: #333;">
                                <h2>Cảm ơn bạn đã đặt phòng thú cưng bên Pet_Hotel!</h2>
                                <p>Thông báo: Bạn có lịch đặt phòng lúc ${checkInTime.toLocaleTimeString()}.</p>
                            </div>`;
                    } else if (currentTime >= emailReminderTime && currentTime < emailCancelTime) {
                        emailContent = `
                            <div style="font-family: Arial, sans-serif; color: #333;">
                                <h2>Nhắc nhở: Bạn đã quá lịch đặt phòng!</h2>
                                <p>Nếu trong 15 phút nữa bạn không mang thú tới, phòng của bạn sẽ bị hủy.</p>
                            </div>`;
                    } else if (currentTime >= emailCancelTime) {
                        emailContent = `
                            <div style="font-family: Arial, sans-serif; color: #333;">
                                <h2>Thông báo: Đơn đặt phòng của bạn đã bị hủy.</h2>
                                <p>Chúng tôi rất tiếc vì bạn đã không đến đúng giờ.</p>
                            </div>`;
                    }
                    break;
                case "completed":
                    emailContent = `
                        <div style="font-family: Arial, sans-serif; color: #333;">
                            <h2>Cảm ơn bạn đã sử dụng dịch vụ tại Pet_Hotel!</h2>
                            <p>Quá trình đặt phòng đã hoàn tất. Chúng tôi rất mong được phục vụ bạn trong tương lai.</p>
                        </div>`;
                    break;
                default:
                    break;
            }

            // Gửi email nếu nội dung được tạo
            if (emailContent) {
                await sendMail({ email, subject: emailSubject, html: emailContent });
            }
        }

        return res.status(StatusCodes.OK).json({ 
            message: "Cập nhật trạng thái đặt phòng thành công",
            cancelReason: status === "cancelled" ? cancelReason : undefined
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};


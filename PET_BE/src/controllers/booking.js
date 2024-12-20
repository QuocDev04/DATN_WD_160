import Bookingroom from "../models/bookingroom";
import { StatusCodes } from "http-status-codes";
import BuyNow from "../models/buynow"
import Service from "../models/services"
import { sendMail } from "./sendmail";
import Room from "../models/room";

export const BookingRoom = async (req, res) => {
    const { userId, paymentMethod, service, petName, lastName, age, weight, phone, species, gender, height, checkindate, checkoutdate, orderNotes, buyNowOrder, email } = req.body;

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

        // Kiểm tra trạng thái của phòng và cập nhật nếu cần
        if (buyNowOrderData && Array.isArray(buyNowOrderData.items)) {
            for (const item of buyNowOrderData.items) {
                if (item.roomId) {
                    const room = await Room.findById(item.roomId); // Tìm phòng theo ID
                    if (room && room.status === "drum") {
                        room.status = "pending"; // Cập nhật trạng thái từ "drum" sang "pending"
                        await room.save(); // Lưu thay đổi
                    }
                }
            }
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
            email,
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
            select: "roomName roomprice roomgallely status" // Chỉ lấy các trường cần thiết
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
            select: "roomName roomprice roomgallely status" // Chỉ lấy các trường cần thiết
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
        const { status, email, cancellationReason } = req.body;

        // Kiểm tra trạng thái
        if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid status" });
        }

        // Kiểm tra lý do hủy khi status là cancelled
        if (status === "cancelled" && !cancellationReason) {
            return res.status(StatusCodes.BAD_REQUEST).json({ 
                error: "Cancellation reason is required when cancelling a booking" 
            });
        }

        const bookingRoom = await Bookingroom.findById(_id).populate('items.roomId');
        if (!bookingRoom) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Booking not found" });
        }

        // Kiểm tra trạng thái của phòng
        const room = bookingRoom.items[0]?.roomId; // Lấy phòng từ bookingRoom
        const roomStatus = room?.status; // Lấy trạng thái của phòng
        if (roomStatus === "cancelled" || roomStatus === "completed") {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: `Cannot change status from '${roomStatus}' as it is already finalized`
            });
        }

        // Cập nhật trạng thái đặt phòng và lý do hủy nếu có
        bookingRoom.status = room._id;
        if (status === "cancelled") {
            bookingRoom.cancellationReason = cancellationReason;
        }
        await bookingRoom.save();

        // Cập nhật trạng thái của tất cả các phòng trong đơn hàng
        for (const item of bookingRoom.items) {
            const room = item.roomId;
            if (room) {
                // Nếu trạng thái là "cancelled", chuyển phòng về "drum"
                // Ngược lại, sử dụng trạng thái được gửi từ request
                room.status = status === "cancelled" ? "drum" : status;
                await room.save();
            }
        }
        if (status === "confirmed" || status === "completed") {
            // Kiểm tra email tồn tại
            if (!email) {
                return res.status(StatusCodes.BAD_REQUEST).json({ 
                    error: "Email is required for sending notifications" 
                });
            }
            // Lấy danh sách phòng và trạng thái
            const roomStatuses = bookingRoom.items.map(item => ({
                roomName: item.roomId.roomName,
                status: item.roomId.status
            }));

            const roomStatusText = roomStatuses
                .map(room => `- Phòng ${room.roomName}: ${room.status}`)
                .join('\n');

            const emailSubject = status === "confirmed"
                ? "Xác nhận đặt phòng thành công"
                : "Hoàn thành dịch vụ - Cảm ơn quý khách";

            const emailContent = status === "confirmed"
                ? `Xin chào ${bookingRoom.lastName},\n\n` +
                  `Đơn đặt phòng của bạn đã được xác nhận thành công.\n` +
                  `Thông tin chi tiết:\n` +
                  `- Tên thú cưng: ${bookingRoom.petName}\n` +
                  `- Thời gian check-in: ${new Date(bookingRoom.checkindate).toLocaleString('vi-VN')}\n` +
                  `- Thời gian check-out: ${new Date(bookingRoom.checkoutdate).toLocaleString('vi-VN')}\n\n` +
                  `Trạng thái phòng:\n${roomStatusText}\n\n` +
                  `Vui lòng mang thú cưng đến đúng ngày và giờ đã hẹn để chúng tôi có thể phục vụ bạn tốt nhất.\n\n` +
                  `Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!`
                : `Xin chào ${bookingRoom.lastName},\n\n` +
                  `Chúng tôi xin thông báo dịch vụ của bạn đã hoàn thành.\n\n` +
                  `Thông tin chi tiết:\n` +
                  `- Tên thú cưng: ${bookingRoom.petName}\n` +
                  `- Thời gian lưu trú: từ ${new Date(bookingRoom.checkindate).toLocaleString('vi-VN')} đến ${new Date(bookingRoom.checkoutdate).toLocaleString('vi-VN')}\n` +
                  `- Tổng chi phí: ${bookingRoom.totalPrice.toLocaleString('vi-VN')} VNĐ\n\n` +
                  `Trạng thái phòng:\n${roomStatusText}\n\n` +
                  `Chúng tôi rất vui khi được phục vụ bạn và thú cưng của bạn.\n` +
                  `Nếu bạn hài lòng với dịch vụ của chúng tôi, hãy giới thiệu chúng tôi cho bạn bè của bạn.\n\n` +
                  `Trân trọng,\n` +
                  `Đội ngũ Pet Hotel`;
            try {
                await sendMail({
                    email: email,
                    subject: emailSubject,
                    html: emailContent.replace(/\n/g, '<br>')  // Convert newlines to HTML breaks
                });
                console.log('Email sent successfully to:', email);
            } catch (emailError) {
                console.error("Error sending email:", emailError);
                // Thêm thông báo lỗi vào response nhưng vẫn tiếp tục xử lý
                return res.status(StatusCodes.OK).json({
                    message: "Cập nhật trạng thái thành công nhưng không gửi được email",
                    error: emailError.message,
                    bookingRoom
                });
            }
        }
        return res.status(StatusCodes.OK).json({
            message: "Cập nhật trạng thái đặt phòng thành công",
            bookingRoom
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
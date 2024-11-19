import { StatusCodes } from 'http-status-codes';
import BuyNow from '../models/buynow';
import Room from '../models/room';

export const buyNow = async (req, res) => {
    const { userId, items } = req.body;

    // Kiểm tra nếu không có items hoặc roomId
    if (!items || items.length === 0 || !items[0].roomId) {
        return res.status(400).json({ error: 'roomId is required' });
    }

    const roomId = items[0].roomId;  // Lấy roomId từ items[0]

    try {
        console.log('Received roomId:', roomId);  // Logging roomId

        const room = await Room.findById(roomId);

        if (!room) {
            console.log('Room not found with id:', roomId);  // Logging khi không tìm thấy phòng
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Room not found' });
        }

        const roomPrice = room.roomprice;

        const buyNowOrder = await BuyNow.create({
            userId,
            items: [
                {
                    roomId,
                    roomprice: roomPrice,
                }
            ],
            totalPrice: roomPrice,  // Hoặc sử dụng totalPrice nếu cần
        });

        return res.status(StatusCodes.CREATED).json(buyNowOrder);
    } catch (error) {
        console.error("Error in buyNow: ", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};






// Hàm lấy thông tin đơn hàng BuyNow theo userId và _id
export const getByUserId = async (req, res) => {
    try {
        const { userId, _id } = req.params;
        const buynow = await BuyNow.findOne({ userId, _id })
            .populate({
                path: "items.roomId",
                select: "roomName roomprice roomgallely" // Chỉ lấy các trường cần thiết
            });

        console.log(buynow);  // Kiểm tra kết quả trả về

        if (!buynow) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "BuyNow order not found" });
        }

        return res.status(StatusCodes.OK).json(buynow);
    } catch (error) {
        console.error(error); // Ghi lại lỗi chi tiết
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to get BuyNow data" });
    }
};


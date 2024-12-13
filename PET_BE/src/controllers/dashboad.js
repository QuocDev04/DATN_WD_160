import BookingRoom from "../models/bookingroom"
import User from "../models/user"
import Cmt from "../models/evaluate"
export const getAll = async (req, res) => {
    try {
        const totalcompletedRooms = await BookingRoom.countDocuments({ status: 'completed' });
        const totalCancelledRooms = await BookingRoom.countDocuments({ status: 'cancelled' });
        const totalconfirmedRooms = await BookingRoom.countDocuments({ status: 'confirmed' });
        const totalpendingRooms = await BookingRoom.countDocuments({ status: 'pending' });
        const pricesData = await BookingRoom.find({ status: 'completed' }, 'totalPrice');
        const prices = pricesData.map(price => price.totalPrice);
        const totalPrice = prices.reduce((acc, curr) => acc + curr, 0);
        const totalUsers = await User.countDocuments();
        const totalCmt = await Cmt.countDocuments();

        res.json({
            totalcompletedRooms,
            totalCancelledRooms,
            totalconfirmedRooms,
            totalpendingRooms,
            totalUsers,
            totalCmt,
            prices,
            totalPrice,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy thống kê' });
    }
}


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

        // Tính doanh thu theo ngày
        const dailyRevenue = await BookingRoom.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, total: { $sum: "$totalPrice" } } }
        ]);

        // Tính doanh thu theo tuần
        const weeklyRevenue = await BookingRoom.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: { $week: "$createdAt" }, total: { $sum: "$totalPrice" } } }
        ]);

        // Tính doanh thu theo tháng
        const monthlyRevenue = await BookingRoom.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: { $month: "$createdAt" }, total: { $sum: "$totalPrice" } } }
        ]);

        // Tính doanh thu theo năm
        const yearlyRevenue = await BookingRoom.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: { $year: "$createdAt" }, total: { $sum: "$totalPrice" } } }
        ]);

        res.json({
            totalcompletedRooms,
            totalCancelledRooms,
            totalconfirmedRooms,
            totalpendingRooms,
            totalUsers,
            totalCmt,
            prices,
            totalPrice,
            dailyRevenue, // Doanh thu theo ngày
            weeklyRevenue, // Doanh thu theo tuần
            monthlyRevenue, // Doanh thu theo tháng
            yearlyRevenue, // Doanh thu theo năm
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy thống kê' });
    }
}


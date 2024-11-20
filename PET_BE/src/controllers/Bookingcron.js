import cron from 'node-cron';
import moment from 'moment';
import Bookingroom from '../models/bookingroom';

const bookingCronJob = () => {
    cron.schedule('*/1 * * * *', async () => {  // Chạy mỗi phút
        try {
            // Lấy tất cả các đơn đặt phòng có trạng thái 'pending' và chưa được hủy
            const bookings = await Bookingroom.find({
                status: 'pending',  // Chỉ lấy những booking đang chờ
                checkindate: { $lte: new Date() },  // Đảm bảo thời gian check-in đã đến hoặc trong quá khứ
            });

            // Lặp qua từng đơn đặt phòng
            for (const booking of bookings) {
                const checkInTime = moment(booking.checkindate);  // Thời gian check-in từ booking
                const currentTime = moment(); // Thời gian hiện tại
                const timeDifference = currentTime.diff(checkInTime, 'minutes');  // Tính toán chênh lệch thời gian theo phút

                // Log để kiểm tra
                console.log(`Booking ID: ${booking._id}`);
                console.log(`Check-in Time: ${checkInTime.format()}`);
                console.log(`Current Time: ${currentTime.format()}`);
                console.log(`Time Difference: ${timeDifference} minutes`);

                // Nếu quá 45 phút và trạng thái là 'pending', cập nhật thành 'cancelled'
                if (timeDifference > 45 && booking.status === "pending") {
                    booking.status = "cancelled";
                    await booking.save();
                    console.log(`Booking with ID ${booking._id} has been automatically cancelled due to time limit.`);
                }
            }
        } catch (error) {
            console.error("Error during cron job: ", error);
        }
    });
};

export default bookingCronJob;

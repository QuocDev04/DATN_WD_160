import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        roomName: {
            type: String,
            required: true,
        },
        roomdescription: {
            type: String,
        },
        roomprice: {
            type: Number,
            required: true
        },
        status:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BookingRoom",
            required: true,
        },
        category: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
                required: true,
            },
        ],
        roomgallely: {
            type: [String],
            required: true,
        },
        commentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    },
    {
        timestamps: true, versionKey: false
    }
)

// Kiểm tra xem mô hình đã được định nghĩa chưa
const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

roomSchema.methods.getBookingStatus = function() {
    return this.status; // Trả về trạng thái của booking
};

export default Room;
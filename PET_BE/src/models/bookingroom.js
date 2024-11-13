import mongoose from "mongoose";

const RoomItemSchema = new mongoose.Schema(
    {
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        }
    },
    { _id: false },
)
const BookingRoomSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [RoomItemSchema],
        paymentMethod: {
            type: String,
        },
        lastName: {
            type: String,
            required: true,
        },
        petName: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        weight: {
            type: String,
            required: true,
        },
        species: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        height: {
            type: String,
            required: true,
        },
        orderNotes: {
            type: String,
        },
        totalPrice: {
            type: Number,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "shipped", "delivered"],
            default: "pending",
        },
        checkindate: {
            type: Date,
        },
        checkoutdate: {
            type: Date,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true, versionKey: false }
);
export default mongoose.model("BookingRoom", BookingRoomSchema)
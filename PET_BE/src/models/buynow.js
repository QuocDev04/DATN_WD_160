import mongoose, { Schema } from 'mongoose';

const buyNowItemSchema = new Schema(
    {
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },
        roomName: {
            type: String,
        },
        roomgallely: {
            type: String,
        }
    },
    { _id: false }
);

const buyNowSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: [buyNowItemSchema],
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            index: { expires: '30m' } // Index với thời gian sống là 30 phút
        }
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model('BuyNow', buyNowSchema);

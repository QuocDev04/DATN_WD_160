import mongoose from "mongoose";



const roomSchema = new mongoose.Schema(
    {
        roomName: {
            type: String,
            required: true,
        },
        combo: [{
            title: {
                type: String,
                required: true,
            }
        }],
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        status: {
            type: String,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        totalPrice: {
            type: Number,
        },
        attrubite: {
            type: String,
            required: true,
        },
        gallely: {
            type: [String],
            required: true,
        },
        commentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            required: true,
        },
    },
    {
        timestamps: true, versionKey: false
    }
)
export default mongoose.model("Room", roomSchema)
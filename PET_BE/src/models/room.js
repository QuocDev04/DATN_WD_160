import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        roomName: {
            type: String,
            required: true,
        },
        roomdescription: {
            type: String,
            required: true,
        },
        roomprice: {
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
        roomgallely: {
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
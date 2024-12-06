import mongoose, { Schema } from "mongoose";


const evaluateSchema = new mongoose.Schema(
    {
        user: {
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            avatar: {
                type: String,
                required: true,
            },
        },
        description: {
            type: String,
        },
        rating: {
            type: String
        },
        roomId: {
            type: Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },
    }, {
    timestamps: true, versionKey: false
}
)
export default mongoose.model("Comment", evaluateSchema)
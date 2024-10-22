import mongoose from "mongoose";



const BookingRoomSchema = new mongoose.Schema(
    {
        petId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pet",
            required: true,
        },
        commentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            required: true,
        },
        checkindate: {
            type:Date
        },
        checkoutdate:{
            type:Date
        },
        totalPrice:{
            type:Number
        }
    },
    {
        timestamps:true, versionKey:false
    }
)
export default mongoose.model("BookingRoom", BookingRoomSchema)
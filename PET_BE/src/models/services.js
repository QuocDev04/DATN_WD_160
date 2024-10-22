import mongoose from "mongoose";


const ServicesSchema = mongoose.Schema(
    {
        servicesName:{
            type:String,
            required: true,
        },
        description:{
            type: String,
        },
        price:{
            type:Number,
            required: true,
        },
        totalPrice:{
            type:Number,
        },
        petId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pet",
            required: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        commentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            required: true,
        },
    }, {
        timestamps: true, versionKey: false
}
)
export default mongoose.model("Services",ServicesSchema)
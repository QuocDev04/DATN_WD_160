import mongoose from "mongoose";


const ServicesSchema = mongoose.Schema(
    {
        servicesName:{
            type:String,
            required: true,
        },
        descriptionService:{
            type: String,
        },
        priceService:{
            type:Number,
            required: true,
        },
        galleryService: {
            type: [String],
        },
    }, {
        timestamps: true, versionKey: false
}
)
export default mongoose.model("Services",ServicesSchema)
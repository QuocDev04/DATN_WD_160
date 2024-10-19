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
        gallery: {
            type: [String],
        },
    }, {
        timestamps: true, versionKey: false
}
)
export default mongoose.model("Services",ServicesSchema)
import mongoose from "mongoose";



const ProductSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        gallery: {
            type: [String],
        },
    },
    {
        timestamps: true, versionKey: false
    }
)
export default mongoose.model("Product", ProductSchema)
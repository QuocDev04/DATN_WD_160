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
        categoryproduct:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "CategoryProduct",
            required: true,
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
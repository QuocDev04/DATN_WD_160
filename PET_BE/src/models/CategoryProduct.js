import mongoose from "mongoose";


const CategoryProductSchema = new mongoose.Schema(
    {
        CategoryProductName:{
            type:String,
            required: true,
        }
    },
    {
        timestamps:true, versionKey:false
    }
)
export default mongoose.model("CategoryProduct", CategoryProductSchema)
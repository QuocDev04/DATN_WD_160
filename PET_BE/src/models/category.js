import mongoose from "mongoose";


const CategorySchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required: true,
        }
    },
    {
        timestamps:true, versionKey:false
    }
)
export default mongoose.model("Category", CategorySchema)
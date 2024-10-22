import mongoose from "mongoose";


const evaluateSchema = new mongoose.Schema(
    {
        description:{
            type:String,
        },
        rating:{
            type:String
        }
    },{
        timestamps:true, versionKey:false
    }
)
export default mongoose.model("Comment", evaluateSchema)
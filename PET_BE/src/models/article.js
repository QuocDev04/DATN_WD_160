import mongoose from "mongoose";


const ArticleSchema = new mongoose.Schema(
    {
        TitleArticle: {
            type: String,
            required: true,
        },
        imgArticle: [{
            type: String,
            required: true,
        }],
        DescriptionArticle: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true, versionKey: false
    }
)
export default mongoose.model("Article", ArticleSchema)
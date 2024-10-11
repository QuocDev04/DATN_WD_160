import mongoose from "mongoose";


const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            minlength: 3,
            maxlength: 30,
        },
        avatar: {
            type: String,
            default:
                "https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg",
        },
        phone: {
            type: Number,
        },
        address: [
            {
                city: {
                    type: String,
                },
                district: {
                    type: String,
                },
                commune: {
                    type: String,
                },
            }
        ]
    },
    { timestamps: true, versionKey: false }
)
export default mongoose.model("User", UserSchema)
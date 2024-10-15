import mongoose from "mongoose";


const PetSchema = new mongoose.Schema(
    {
        petName: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        weight: {
            type: String,
            required: true,
        },
        species: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        height: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true, versionKey: false }
)
export default mongoose.model("Pet", PetSchema)
import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        default: "user"
    } 
},
{
    timestamps: true,
}
);

export const User = mongoose.model("User", userShema);

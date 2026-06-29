import mongoose from "mongoose";



const authSchema = new mongoose.Schema({
    name: String,
    email:
    {
        type: String,
        unique: true
    },
    password:
    {
        type: String,
        required: true
    },
}, { timestamps: true })


const userModel = mongoose.model("Estate", authSchema)

export default userModel





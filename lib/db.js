import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("CONNECTED TO MONGODB")
    } catch (error) {
        console.log("DB CONNECT ERROR: " + error)
    }
}
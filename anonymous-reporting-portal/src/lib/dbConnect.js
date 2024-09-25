import mongoose, { connect, connection } from "mongoose";

let isConnected = false;

export async function dbConnect() {
    if (connection.isConnected) {
        console.log("MongoDB is already connected!");
        return;
    }
    if (!process.env.MONGO_URI) {
        console.error("MONGO_URI environment variable is not defined.");
        throw new Error("MONGO_URI is required to connect to MongoDB.");
    }

    try {
        await mongoose.connect(process.env.MONGO_URI)
        isConnected = true
        console.log("MongoDB connected successfully.");
        mongoose.connection.on("connected",()=>{
            console.log("MongoDB connection established.");
        })
        mongoose.connection.on("disconnected", () => {
            console.warn("MongoDB connection disconnected.");
        });
        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err.message);
        });

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Failed to connect to MongoDB.");
    }
}
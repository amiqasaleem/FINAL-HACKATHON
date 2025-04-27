import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

const url = process.env.MONGODB_URL

const connectDB = async () => {
    try {
      const conn = await mongoose.connect( url, {
        dbName: "finalhackathon"
      });

      console.log(`MongoDB Connected:`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

export default connectDB

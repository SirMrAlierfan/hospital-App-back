import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ Error: MONGO_URI is not defined in .env file");
    process.exit(1);
}


export const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(` MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(` Error: ${error}`);
        process.exit(1);
    }
};

export const disconnectDB = async (): Promise<void> => {
    await mongoose.connection.close();
    console.log(" MongoDB connectio closed.");
};

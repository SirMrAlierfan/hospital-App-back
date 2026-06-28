import express from "express"
import dotenv from 'dotenv';
import { connectDB, disconnectDB } from "./config/dbInit.js";

dotenv.config();

const app = express()
await connectDB()
const PORT = process.env.PORT || 3500;
app.listen(PORT => {
    console.log("Server is Up on : " + PORT);
})
await disconnectDB()
import express from "express"
import dotenv from 'dotenv';
import { connectDB, disconnectDB } from "./config/dbInit.js";
import { json } from "zod";
import helmet from "helmet";
import cors, { type CorsOptions } from "cors"
import { corsOptions } from "./utils/options/cors.js";
import { helmetOptions } from "./utils/options/helmet.js";
dotenv.config();

const app = express()
await connectDB()
const PORT = process.env.PORT || 3500;
app.use(express.json())
app.use(cors(corsOptions))
app.use(helmet(helmetOptions))

app.use("/", (req, res, next) => {
    res.status(200).send(`req : ${req.method}`)
})

app.listen(PORT, (err) => {
    console.error(err || null)
    console.log("Server is Up on : " + PORT);
})

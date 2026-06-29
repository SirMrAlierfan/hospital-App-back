import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || "JWTSSCODE" //fix later type err

export const generateToken = (payload: { id: string; role: string }): string => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "7d", 
    });
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

import type { Request, Response } from "express";
import { AuthService } from "../../services/auth/service.js";
import type {
    RegisterPatientInput,
    RegisterDoctorInput,
    LoginInput
} from "../../validation/auth.validation.js";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    registerPatient = async (req: Request, res: Response) => {
        try {
            const data: RegisterPatientInput = req.body;
            const result = await this.authService.registerPatient(data);
            const { password, ...userWithoutPassword } = result.user;

            return res.status(201).json({
                success: true,
                message: "Patient registered successfully",
                data: {
                    user: userWithoutPassword,
                    token: result.token,
                },
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error.message || "Registration failed",
            });
        }
    }

    registerDoctor = async (req: Request, res: Response) => {
        try {
            const data: RegisterDoctorInput = req.body;
            const result = await this.authService.registerDoctor(data);
            const { password, ...userWithoutPassword } = result.user;

            return res.status(201).json({
                success: true,
                message: "Doctor registered successfully",
                data: {
                    user: userWithoutPassword,
                    token: result.token,
                },
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error.message || "Doctor registration failed",
            });
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const data: LoginInput = req.body;
            const result = await this.authService.login(data);

            const { password, ...userWithoutPassword } = result.user as any;

            return res.status(200).json({
                success: true,
                message: "Login successful",
                data: {
                    user: userWithoutPassword,
                    token: result.token,
                },
            });
        } catch (error: any) {
            return res.status(401).json({
                success: false,
                message: error.message || "Login failed",
            });
        }
    }
}

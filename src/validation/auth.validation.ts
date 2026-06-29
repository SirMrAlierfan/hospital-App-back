import { z } from "zod";


export const registerPatientSchema = z.object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().optional(),
});


export const registerDoctorSchema = z.object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    specialty: z.string().min(2, "Specialty is required"),
    consultationFee: z.number().positive("Fee must be a positive number"),
    licenseNumber: z.string().min(5, "License number is required"),
    clinicName: z.string().optional(),
});


export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});


export type RegisterPatientInput = z.infer<typeof registerPatientSchema>;
export type RegisterDoctorInput = z.infer<typeof registerDoctorSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

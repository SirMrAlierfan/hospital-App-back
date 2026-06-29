import { z } from "zod";


export const registerPatientSchema = z.object({
  body: z.object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().optional(),
  }),
});


export const registerDoctorSchema = z.object({
  body: z.object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().optional(),
    specialty: z.string().min(2, "Specialty is required"),
    consultationFee: z.number().positive("Fee must be a positive number"),
    clinicName: z.string().optional(),
    licenseNumber: z.string().min(5, "Invalid license number"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
  }),
});


export type RegisterPatientInput = z.infer<typeof registerPatientSchema>["body"];
export type RegisterDoctorInput = z.infer<typeof registerDoctorSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];

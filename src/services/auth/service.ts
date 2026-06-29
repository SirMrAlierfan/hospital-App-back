import User from "../../models/user.js";
import PatientProfile from "../../models/PatientProfile.js";
import DoctorProfile from "../../models/DoctorProfile.js";
import { hashPassword, comparePassword } from "../../utils/password.util.js";
import { generateToken } from "../../utils/jwt.util.js";
import type {
    RegisterPatientInput,
    RegisterDoctorInput,
    LoginInput
} from "../../validation/auth.validation.js"


export class AuthService {
    async registerPatient(data: RegisterPatientInput) {
        const { fullName, email, password, phone } = data;

        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error("User with this email already exists");

        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            role: "patient",
        });

        await PatientProfile.create({
            userId: newUser._id,
            phone,
        });


        const token = generateToken({ id: newUser._id.toString(), role: newUser.role });

        return { user: newUser, token };
    }

    async registerDoctor(data: RegisterDoctorInput) {
        const { fullName, email, password, specialty, consultationFee, licenseNumber } = data;

        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error("User with this email already exists");

        const hashedPassword = await hashPassword(password);

        const newDoctor = await User.create({
            fullName,
            email,
            password: hashedPassword,
            role: "doctor",
        });

        await DoctorProfile.create({
            userId: newDoctor._id,
            specialty,
            consultationFee,
            licenseNumber,
        });

        const token = generateToken({ id: newDoctor._id.toString(), role: newDoctor.role });

        return { user: newDoctor, token };
    }


    async login(data: LoginInput) {
        const { email, password } = data;

        const user = await User.findOne({ email });
        if (!user) throw new Error("Invalid email or password");

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) throw new Error("Invalid email or password");

        const token = generateToken({ id: user._id.toString(), role: user.role });

        return { user, token };
    }
}

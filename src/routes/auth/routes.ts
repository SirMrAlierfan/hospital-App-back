import { Router } from "express";
import {
    registerPatientSchema,
    registerDoctorSchema,
    loginSchema
} from "../../validation/auth.validation.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { AuthController } from "../../controllers/auth/controller.js";

const router = Router();
const authController = new AuthController();



router.post("/register/patient", validate(registerPatientSchema), authController.registerPatient);


router.post("/register/doctor", validate(registerDoctorSchema), authController.registerDoctor);


router.post("/login", validate(loginSchema), authController.login);

export default router;

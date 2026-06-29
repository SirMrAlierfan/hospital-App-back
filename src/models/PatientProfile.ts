import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IPatientProfile extends Document {
  userId: Types.ObjectId;
  gender?: "male" | "female" | "other";
  birthDate?: Date;
  nationalId?: string;
  address?: string;
  emergencyContact?: {
    name?: string;
    phone?: string;
    relation?: string;
  };
  medicalNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const patientProfileSchema = new Schema<IPatientProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    birthDate: {
      type: Date,
    },
    nationalId: {
      type: String,
      trim: true,
      index: true,
    },
    address: {
      type: String,
      trim: true,
    },
    emergencyContact: {
      name: { type: String, trim: true },
      phone: { type: String, trim: true },
      relation: { type: String, trim: true },
    },
    medicalNotes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const PatientProfile: Model<IPatientProfile> =
  mongoose.models.PatientProfile ||
  mongoose.model<IPatientProfile>("PatientProfile", patientProfileSchema);

export default PatientProfile;

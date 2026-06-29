import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IAvailabilitySlot {
  day: "sat" | "sun" | "mon" | "tue" | "wed" | "thu" | "fri";
  startTime: string; 
  endTime: string;   
}

export interface IDoctorProfile extends Document {
  userId: Types.ObjectId;
  specialty: string;
  subSpecialties?: string[];
  licenseNumber?: string;
  biography?: string;
  consultationFee: number;
  appointmentDuration: number; 
  clinicName?: string;
  clinicAddress?: string;
  location?: {
    lat?: number;
    lng?: number;
  };
  availability?: IAvailabilitySlot[];
  isVerified: boolean;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

const availabilitySlotSchema = new Schema<IAvailabilitySlot>(
  {
    day: {
      type: String,
      enum: ["sat", "sun", "mon", "tue", "wed", "thu", "fri"],
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const doctorProfileSchema = new Schema<IDoctorProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    specialty: {
      type: String,
      required: [true, "Specialty is required"],
      trim: true,
      index: true,
    },
    subSpecialties: [
      {
        type: String,
        trim: true,
      },
    ],
    licenseNumber: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    biography: {
      type: String,
      trim: true,
    },
    consultationFee: {
      type: Number,
      required: [true, "Consultation fee is required"],
      min: 0,
    },
    appointmentDuration: {
      type: Number,
      default: 15,
      min: 5,
    },
    clinicName: {
      type: String,
      trim: true,
    },
    clinicAddress: {
      type: String,
      trim: true,
    },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    availability: [availabilitySlotSchema],
    isVerified: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

const DoctorProfile: Model<IDoctorProfile> =
  mongoose.models.DoctorProfile ||
  mongoose.model<IDoctorProfile>("DoctorProfile", doctorProfileSchema);

export default DoctorProfile;

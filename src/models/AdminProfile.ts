import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IAdminProfile extends Document {
  userId: Types.ObjectId;
  hospitalName?: string;
  department?: string;
  permissions?: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const adminProfileSchema = new Schema<IAdminProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    hospitalName: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    permissions: [
      {
        type: String,
        trim: true,
      },
    ],
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const AdminProfile: Model<IAdminProfile> =
  mongoose.models.AdminProfile ||
  mongoose.model<IAdminProfile>("AdminProfile", adminProfileSchema);

export default AdminProfile;

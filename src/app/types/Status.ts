import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStatus extends Document {
  [key: string]: unknown;
  _id: mongoose.Types.ObjectId;
  name: string;
  isActive?: boolean;
}

const StatusSchema = new Schema<IStatus>(
  {
    name: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "statuses"  }
);
const Status: Model<IStatus> = mongoose.models?.Status || mongoose.model<IStatus>("Status", StatusSchema);

export default Status;

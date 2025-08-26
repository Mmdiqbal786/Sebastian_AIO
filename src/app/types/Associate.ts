import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAssociate extends Document {
  [key: string]: unknown;
  _id: mongoose.Types.ObjectId;
  associateId: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  document: string;
  userId: mongoose.Types.ObjectId;
  statusId: mongoose.Types.ObjectId;
  isActive?: boolean;
}

export const AssociateSchema = new Schema<IAssociate>(
  {
    associateId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    address: { type: String, required: true },
    document: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    statusId: { type: Schema.Types.ObjectId, ref: "Status", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "associates"  }
);

const Associate: Model<IAssociate> = mongoose.models?.Associate || mongoose.model<IAssociate>("Associate", AssociateSchema);
export default Associate;

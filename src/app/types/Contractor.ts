import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContractor extends Document {
  [key: string]: unknown;
  _id: mongoose.Types.ObjectId;
  contractorId: string;
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

export const ContractorSchema = new Schema<IContractor>(
  {
    contractorId: { type: String, required: true, unique: true },
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
  { timestamps: true, collection: "contractors"  }
);

const Contractor: Model<IContractor> = mongoose.models?.Contractor || mongoose.model<IContractor>("Contractor", ContractorSchema);
export default Contractor;

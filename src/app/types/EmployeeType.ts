import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEmployeeType extends Document {
  [key: string]: unknown;
  _id: mongoose.Types.ObjectId;
  name: string;
}

export const EmployeeTypeSchema = new Schema<IEmployeeType>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true, collection: "employeeTypes"  }
);

const EmployeeType: Model<IEmployeeType> = mongoose.models?.EmployeeType || mongoose.model<IEmployeeType>("EmployeeType", EmployeeTypeSchema);
export default EmployeeType;

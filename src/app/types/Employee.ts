import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEmployee extends Document {
  [key: string]: unknown;
  _id: mongoose.Types.ObjectId;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  type: string;
  address: string;
  profileImg: string;
  document: string;
  password: string;
  roleId: mongoose.Types.ObjectId;
}

export const EmployeeSchema = new Schema<IEmployee>(
  {
    employeeId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    address: { type: String, required: true },
    type: { type: String, required: true },
    profileImg: { type: String, required: true },
    document: { type: String, required: true },
    password: { type: String, required: true },
    roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
  },
  { timestamps: true, collection: "employees"  }
);

const Employee: Model<IEmployee> = mongoose.models?.Employee || mongoose.model<IEmployee>("Employee", EmployeeSchema);
export default Employee;

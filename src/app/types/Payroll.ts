import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPayroll extends Document {
  [key: string]: unknown;
  _id: mongoose.Types.ObjectId;
  name: string;
  location: string;
  month: string;
  owner: string;
  payer: string;
  invoiceOrPayslip: string;
  payment: string;
  projectId: mongoose.Types.ObjectId;
  statusId: mongoose.Types.ObjectId;
  isActive?: boolean;
}

export const PayrollSchema = new Schema<IPayroll>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    month: { type: String, required: true },
    owner: { type: String, required: true },
    payer: { type: String, required: true },
    invoiceOrPayslip: { type: String, required: true },
    payment: { type: String, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    statusId: { type: Schema.Types.ObjectId, ref: "Status", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "payrolls"  }
);

const Payroll: Model<IPayroll> = mongoose.models?.Payroll || mongoose.model<IPayroll>("Payroll", PayrollSchema);
export default Payroll;

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExpense extends Document {
  [key: string]: unknown;
  _id: mongoose.Types.ObjectId;
  name: string;
  projectId: mongoose.Types.ObjectId;
  description: string;
  entryDate: string;
  coset: string;
  statusId: mongoose.Types.ObjectId;
  isActive?: boolean;
}

const ExpenseSchema = new Schema<IExpense>(
  {
    name: { type: String, required: true, unique: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    description: { type: String, required: true },
    entryDate: { type: String, required: true },
    coset: { type: String, required: true },
    statusId: { type: Schema.Types.ObjectId, ref: "Status", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "expenses"  }
);
const Expense: Model<IExpense> = mongoose.models?.Expense || mongoose.model<IExpense>("Expense", ExpenseSchema);

export default Expense;

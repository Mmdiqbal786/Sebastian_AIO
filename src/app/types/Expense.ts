import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExpense extends Document {
  [key: string]: unknown;
  _id: mongoose.Types.ObjectId;
  name: string;
  projectId: mongoose.Types.ObjectId;
  description: string;
  entryDate: string;
  cost: string;
  statusId: mongoose.Types.ObjectId;
  isActive?: boolean;
}

const ExpenseSchema = new Schema<IExpense>(
  {
    name: { type: String, required: true, unique: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    description: { type: String, required: true },
    entryDate: { type: String, required: true },
    cost: { type: String, required: true },
    statusId: { type: Schema.Types.ObjectId, ref: "Status", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "expenses"  }
);
const Expense: Model<IExpense> = mongoose.models?.Expense || mongoose.model<IExpense>("Expense", ExpenseSchema);

export default Expense;

// import mongoose, { Schema, Document, Model } from "mongoose";
// import { decimalTransform } from "@/app/lib/utils/mongooseTransformDecimal";

// export interface IExpense extends Document {
//   [key: string]: unknown;
//   _id: mongoose.Types.ObjectId;
//   name: string;
//   projectId: mongoose.Types.ObjectId;
//   description: string;
//   entryDate: string;
//   cost: mongoose.Types.Decimal128 | number;
//   statusId: mongoose.Types.ObjectId;
//   isActive?: boolean;
// }

// const ExpenseSchema = new Schema<IExpense>(
//   {
//     name: { type: String, required: true, unique: true },
//     projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
//     description: { type: String, required: true },
//     entryDate: { type: String, required: true },
//     cost: { type: Schema.Types.Decimal128, required: true },
//     statusId: { type: Schema.Types.ObjectId, ref: "Status", required: true },
//     isActive: { type: Boolean, default: true },
//   },
//   { 
//     timestamps: true, 
//     collection: "expenses",
//     toJSON: { 
//       virtuals: true, 
//       ...decimalTransform(["cost"])
//     },
//     toObject: { 
//       virtuals: true, 
//       ...decimalTransform(["cost"])
//     }
//   }
// );

// // 🔹 Instance method
// ExpenseSchema.methods.getCostNumber = function (): number {
//   return parseFloat(this.cost.toString());
// };

// // 🔹 Virtual field
// ExpenseSchema.virtual("costNumber").get(function (this: IExpense) {
//   return parseFloat(this.cost.toString());
// });

// const Expense: Model<IExpense> =
//   mongoose.models?.Expense || mongoose.model<IExpense>("Expense", ExpenseSchema);

// export default Expense;
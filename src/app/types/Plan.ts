// import mongoose, { Schema, Document, Model } from "mongoose";

// export interface IPlan extends Document {
//   name: string;
//   price: number; 
//   foodSelections: {
//     category: mongoose.Types.ObjectId;
//     selectionLimit: number;
//     selectedFoods?: mongoose.Types.ObjectId[];
//   }[];
// }

// export const PlanSchema = new Schema<IPlan>(
//   {
//     name: { type: String, required: true, unique: true },
//     price: { type: Number, required: true },
//     foodSelections: [
//       {
//         category: {
//           type: Schema.Types.ObjectId,
//           ref: "FoodCategory",
//           required: true,
//         },
//         selectionLimit: {
//           type: Number,
//           required: true,
//         },
//         selectedFoods: [
//           {
//             type: Schema.Types.ObjectId,
//             ref: "Food",
//           },
//         ],
//       },
//     ],
//   },
//   { timestamps: true, collection: "plans" }
// );

// const Plan: Model<IPlan> =
//   mongoose.models?.Plan || mongoose.model<IPlan>("Plan", PlanSchema);
// export default Plan;

// import mongoose, { Schema, Document, Model } from "mongoose";

// export interface IPlan extends Document {
//   [key: string]: unknown;
//   _id: mongoose.Types.ObjectId;
//   name: string;
//   price: number;
//   validityDuration: number;
//   validityUnit: "day" | "week" | "month" | "year";
//   validFrom: Date;
//   validTill: Date;
//   gapDuration?: number;
//   gapUnit?: "day" | "week" | "month" | "year";
//   foodSelections: {
//     category: mongoose.Types.ObjectId;
//     selectionLimit: number;
//     selectedFoods?: mongoose.Types.ObjectId[];
//   }[];
// }

// export const PlanSchema = new Schema<IPlan>(
//   {
//     name: { type: String, required: true, unique: true },
//     price: { type: Number, required: true },
//     validityDuration: { type: Number, required: true },
//     validityUnit: { type: String, required: true, enum: ["day", "week", "month", "year"] },
//     validFrom: { type: Date, required: true, default: Date.now },
//     validTill: { type: Date },
//     gapDuration: { type: Number, required: false },
//     gapUnit: { type: String, required: false, enum: ["day", "week", "month", "year"] },
//     foodSelections: [
//       {
//         category: { type: Schema.Types.ObjectId, ref: "FoodCategory", required: true },
//         selectionLimit: { type: Number, required: true },
//         selectedFoods: [{ type: Schema.Types.ObjectId, ref: "Food" }],
//       },
//     ],
//   },
//   { timestamps: true, collection: "plans" }
// );

// PlanSchema.pre("save", function (next) {
//   if (!this.validTill && this.validFrom && this.validityDuration && this.validityUnit) {
//     const validFrom = new Date(this.validFrom);
//     const validTill = new Date(validFrom);
//     switch (this.validityUnit) {
//       case "day":
//         validTill.setDate(validTill.getDate() + this.validityDuration);
//         break;
//       case "week":
//         validTill.setDate(validTill.getDate() + this.validityDuration * 7);
//         break;
//       case "month":
//         validTill.setMonth(validTill.getMonth() + this.validityDuration);
//         break;
//       case "year":
//         validTill.setFullYear(validTill.getFullYear() + this.validityDuration);
//         break;
//     }
//     this.validTill = validTill;
//   }
//   next();
// });

// const Plan: Model<IPlan> =
//   mongoose.models?.Plan || mongoose.model<IPlan>("Plan", PlanSchema);
// export default Plan;

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPlan extends Document {
  [key: string]: unknown;
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  validityDuration: number;
  validityUnit: "day" | "week" | "month" | "year";
  validFrom: Date;
  validTill: Date;
  gapDuration?: number;
  gapUnit?: "day" | "week" | "month" | "year";
  totalFoodSelections: number;
  foodSelections: {
    category: mongoose.Types.ObjectId;
    selectionLimit: number;
    selectedFoods?: mongoose.Types.ObjectId[];
  }[];
}

export const PlanSchema = new Schema<IPlan>(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    validityDuration: { type: Number, required: true },
    validityUnit: { type: String, required: true, enum: ["day", "week", "month", "year"] },
    validFrom: { type: Date, required: true, default: Date.now },
    validTill: { type: Date },
    gapDuration: { type: Number, required: false },
    gapUnit: { type: String, required: false, enum: ["day", "week", "month", "year"] },
    totalFoodSelections: { type: Number, required: true, min: [1, "Must allow at least 1 selection"] },
    foodSelections: [
      {
        category: { type: Schema.Types.ObjectId, ref: "FoodCategory", required: true },
        selectionLimit: { type: Number, required: true },
        selectedFoods: [{ type: Schema.Types.ObjectId, ref: "Food" }],
      },
    ],
  },
  { timestamps: true, collection: "plans" }
);

PlanSchema.pre("save", function (next) {
  if (!this.validTill && this.validFrom && this.validityDuration && this.validityUnit) {
    const validFrom = new Date(this.validFrom);
    const validTill = new Date(validFrom);
    switch (this.validityUnit) {
      case "day":
        validTill.setDate(validTill.getDate() + this.validityDuration);
        break;
      case "week":
        validTill.setDate(validTill.getDate() + this.validityDuration * 7);
        break;
      case "month":
        validTill.setMonth(validTill.getMonth() + this.validityDuration);
        break;
      case "year":
        validTill.setFullYear(validTill.getFullYear() + this.validityDuration);
        break;
    }
    this.validTill = validTill;
  }
  next();
});

const Plan: Model<IPlan> =
  mongoose.models?.Plan || mongoose.model<IPlan>("Plan", PlanSchema);
export default Plan;

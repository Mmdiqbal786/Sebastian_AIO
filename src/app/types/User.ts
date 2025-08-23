// /* eslint-disable @typescript-eslint/no-explicit-any */
// import mongoose, { Schema, Document, models } from "mongoose";
// import Plan from "@/app/types/Plan";

// export interface IUser extends Document {
//   [key: string]: unknown;
//   _id: mongoose.Types.ObjectId;
//   name: string;
//   price: number;
//   validityDuration: number;
//   validityUnit: "day" | "week" | "month" | "year";
//   validFrom: Date;
//   validTill: Date;
//   daysLeft: number;
//   timeSlot: string;
//   gapDuration?: number;
//   gapUnit?: "day" | "week" | "month" | "year";
//   categoryId: mongoose.Types.ObjectId;
//   planId: mongoose.Types.ObjectId;
//   email: string;
//   phone: string;
//   address: string;
//   profileImg?: string;
//   password: string;
//   roleId: number;
//   foodSelections?: {
//     category: mongoose.Types.ObjectId;
//     selectedFoods: mongoose.Types.ObjectId[];
//   }[];
//   isActive: boolean;
// }

// const UserSchema = new Schema<IUser>(
//   {
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     validityDuration: { type: Number, required: true },
//     validityUnit: { type: String, required: true, enum: ["day", "week", "month", "year"] },
//     validFrom: { type: Date, required: true, default: Date.now },
//     validTill: { type: Date },
//     totalDays: { type: Number, required: false },
//     daysLeft: { type: Number, required: false },
//     timeSlot: { type: String, required: true },
//     gapDuration: { type: Number, required: false },
//     gapUnit: { type: String, required: false, enum: ["day", "week", "month", "year"] },
//     categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
//     planId: { type: Schema.Types.ObjectId, ref: "Plan", required: true },
//     phone: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     address: { type: String, required: true },
//     profileImg: { type: String, required: false },
//     password: { type: String, required: true },
//     roleId: { type: Number, required: true },
//     foodSelections: [
//       {
//         category: { type: Schema.Types.ObjectId, ref: "FoodCategory", required: true },
//         selectedFoods: [{ type: Schema.Types.ObjectId, ref: "Food" }]
//       }
//     ],
//     isActive: { type: Boolean, default: true },
//   },
//   { timestamps: true }
// );

// UserSchema.pre("save", function (next) {
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

// UserSchema.pre("save", async function (next) {
//   if (this.planId && this.foodSelections && this.foodSelections.length > 0) {
//     try {
//       const plan = await Plan.findById(this.planId);
//       if (plan) {
//         for (const userSelection of this.foodSelections) {
//           const planSelection = plan.foodSelections.find(
//             (fs: any) => fs.category.toString() === userSelection.category.toString()
//           );
//           // if (planSelection) {
//           //   if (userSelection.selectedFoods.length > planSelection.selectionLimit) {
//           //     return next(
//           //       new Error(
//           //         `Exceeded selection limit for category ${userSelection.category}. Limit: ${planSelection.selectionLimit}`
//           //       )
//           //     );
//           //   }
//           // }
//         if (planSelection && userSelection.selectedFoods.length > planSelection.selectionLimit) {
//           return next(
//             new Error(
//               `Exceeded selection limit for category ${userSelection.category}. Limit: ${planSelection.selectionLimit}`
//             )
//           );
//         }
//       }
//     }
//     } catch (error:any) {
//       return next(error);
//     }
//   }
//   next();
// });

// const User = models.User || mongoose.model<IUser>("User", UserSchema);
// export default User;

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  [key: string]: unknown;
  _id: mongoose.Types.ObjectId;
  userId: string;
  name: string;
  email: string;
  phone: string;
  profileImg: string;
  password: string;
  userTypeId: mongoose.Types.ObjectId;
  roleId: mongoose.Types.ObjectId;
  permissions?: Record<
    string,
    {
      view: boolean;
      create: boolean;
      edit: boolean;
      delete: boolean;
    }
  >;
}

export const UserSchema = new Schema<IUser>(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    profileImg: { type: String, required: true },
    password: { type: String, required: true },
    userTypeId: { type: Schema.Types.ObjectId, ref: "UserType", required: true },
    roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
  },
  { timestamps: true, collection: "users"  }
);

const User: Model<IUser> = mongoose.models?.User || mongoose.model<IUser>("User", UserSchema);
export default User;

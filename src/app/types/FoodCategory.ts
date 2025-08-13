import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFoodCategory extends Document {
  [key: string]: unknown;
  _id: mongoose.Types.ObjectId;
  name: string;
}

export const FoodCategorySchema = new Schema<IFoodCategory>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true, collection: "foodCategories"  }
);

const FoodCategory: Model<IFoodCategory> = mongoose.models?.FoodCategory || mongoose.model<IFoodCategory>("FoodCategory", FoodCategorySchema);
export default FoodCategory;

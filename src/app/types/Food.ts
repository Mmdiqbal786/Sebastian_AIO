import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFood extends Document {
  [key: string]: unknown;
  _id: mongoose.Types.ObjectId;
  name: string;
  price: string;
  stock: string;
  image: string;
  categoryId: mongoose.Types.ObjectId;
  foodCategories: mongoose.Types.ObjectId[];
}

export const FoodSchema = new Schema<IFood>(
  {
    name: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    stock: { type: String, required: true },
    image: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "FoodCategory", required: true },
    foodCategories: [{ type: Schema.Types.ObjectId, ref: "FoodCategory" }],
  },
  { timestamps: true, collection: "foods"  }
);

const Food: Model<IFood> = mongoose.models?.Food || mongoose.model<IFood>("Food", FoodSchema);
export default Food;

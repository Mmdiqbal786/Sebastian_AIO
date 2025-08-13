import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
  [key: string]: unknown;
  _id: mongoose.Types.ObjectId;
  name: string;
  plans: mongoose.Types.ObjectId[];
}

export const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    plans: [{ type: Schema.Types.ObjectId, ref: "Plan" }],
  },
  { timestamps: true, collection: "categories" }
);

const Category: Model<ICategory> =
  mongoose.models?.Category || mongoose.model<ICategory>("Category", CategorySchema);

export default Category;

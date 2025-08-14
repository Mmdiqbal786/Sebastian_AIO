import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserType extends Document {
  [key: string]: unknown;
  _id: mongoose.Types.ObjectId;
  name: string;
}

export const UserTypeSchema = new Schema<IUserType>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true, collection: "userTypes"  }
);

const UserType: Model<IUserType> = mongoose.models?.UserType || mongoose.model<IUserType>("UserType", UserTypeSchema);
export default UserType;

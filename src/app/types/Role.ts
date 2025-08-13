import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRole extends Document {
  [key: string]: unknown;
  _id: mongoose.Types.ObjectId;
  name: string;
}

const RoleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true, collection: "roles"  }
);
const Role: Model<IRole> = mongoose.models?.Role || mongoose.model<IRole>("Role", RoleSchema);

export default Role;

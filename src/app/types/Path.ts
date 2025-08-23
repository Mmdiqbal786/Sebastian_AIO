import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPath extends Document {
  [key: string]: unknown;
  _id: mongoose.Types.ObjectId;
  name: string;
  path: string;
  slash: string;
  icon: string;
  iconImport: string;
  showInSidebar?: boolean;
  isActive?: boolean;
}

const PathSchema = new Schema<IPath>(
  {
    name: { type: String, required: true, unique: true },
    path: { type: String, required: true },
    slash: { type: String, required: true },
    icon: { type: String, required: true },
    iconImport: { type: String, required: true },
    showInSidebar: { type: Boolean, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "paths"  }
);
const Path: Model<IPath> = mongoose.models?.Path || mongoose.model<IPath>("Path", PathSchema);

export default Path;

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  [key: string]: unknown;
  _id: mongoose.Types.ObjectId;
  name: string;
  client: string;
  owner: string;
  headCount: string;
  statusId: mongoose.Types.ObjectId;
  isActive?: boolean;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true, unique: true },
    client: { type: String, required: true },
    owner: { type: String, required: true },
    headCount: { type: String, required: true },
    statusId: { type: Schema.Types.ObjectId, ref: "Status", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "projects"  }
);
const Project: Model<IProject> = mongoose.models?.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;

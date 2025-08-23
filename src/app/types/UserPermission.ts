import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserPermission extends Document {
  [key: string]: unknown;
  _id: mongoose.Types.ObjectId;
  name: string;
  userId: mongoose.Types.ObjectId;
  pathId: mongoose.Types.ObjectId;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  isActive?: boolean;
}

const UserPermissionSchema = new Schema<IUserPermission>(
  {
    name: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    pathId: { type: Schema.Types.ObjectId, ref: "Path", required: true },
    canView: { type: Boolean, default: false },
    canCreate: { type: Boolean, default: false },
    canEdit: { type: Boolean, default: false },
    canDelete: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "user_permissions" }
);

const UserPermission: Model<IUserPermission> =
  mongoose.models?.UserPermission ||
  mongoose.model<IUserPermission>("UserPermission", UserPermissionSchema);

export default UserPermission;

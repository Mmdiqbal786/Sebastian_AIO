import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRolePermission extends Document {
  [key: string]: unknown;
  _id: mongoose.Types.ObjectId;
  roleId: mongoose.Types.ObjectId;
  pathId: mongoose.Types.ObjectId;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  isActive?: boolean;
}

const RolePermissionSchema = new Schema<IRolePermission>(
  {
    roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    pathId: { type: Schema.Types.ObjectId, ref: "Path", required: true },
    canView: { type: Boolean, default: false },
    canCreate: { type: Boolean, default: false },
    canEdit: { type: Boolean, default: false },
    canDelete: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "rolePermissions" }
);

const RolePermission: Model<IRolePermission> =
  mongoose.models?.RolePermission ||
  mongoose.model<IRolePermission>("RolePermission", RolePermissionSchema);

export default RolePermission;

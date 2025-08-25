import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  [key: string]: unknown;
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  profileImg: string;
  password: string;
  userTypeId: mongoose.Types.ObjectId;
  roleId: mongoose.Types.ObjectId;
  isActive?: boolean;
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
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    profileImg: { type: String, required: true },
    password: { type: String, required: true },
    userTypeId: { type: Schema.Types.ObjectId, ref: "UserType", required: true },
    roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "users"  }
);

const User: Model<IUser> = mongoose.models?.User || mongoose.model<IUser>("User", UserSchema);
export default User;

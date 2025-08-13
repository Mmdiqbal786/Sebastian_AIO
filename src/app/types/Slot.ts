import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISlot extends Document {
  [key: string]: unknown;
  _id: mongoose.Types.ObjectId;
  name: string;
  time: string;
}

const SlotSchema = new Schema<ISlot>(
  {
    name: { type: String, required: true, unique: true },
    time: { type: String, required: true },
  },
  { timestamps: true, collection: "slots"  }
);
const Slot: Model<ISlot> = mongoose.models?.Slot || mongoose.model<ISlot>("Slot", SlotSchema);

export default Slot;

// src/models/Constituency.ts
import mongoose, { Schema, models } from "mongoose";

const wardSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  constituencyId: {
    type: Schema.Types.ObjectId,
    ref: "Constituency",
    required: true,
  },
});

export const Ward =
  models.Ward || mongoose.model("Ward", wardSchema);

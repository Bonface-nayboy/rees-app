// src/models/Constituency.ts
import mongoose, { Schema, models } from "mongoose";

const constituencySchema = new Schema({
  name: { type: String, required: true },
  description: String,
  countyId: {
    type: Schema.Types.ObjectId,
    ref: "County",
    required: true,
  },
});

export const Constituency =
  models.Constituency || mongoose.model("Constituency", constituencySchema);

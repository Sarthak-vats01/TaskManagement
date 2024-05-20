import mongoose, { Schema } from "mongoose";

const boardSchema = new Schema({
  name: { type: String, required: true },
  boardUserId: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

const boardModel = mongoose.model("Board", boardSchema);

export default boardModel;

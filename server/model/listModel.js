import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  name: { type: String },
  created: { type: Date, default: Date.now },
});

const listSchema = new Schema({
  name: { type: String },
  tasks: [taskSchema], // Array of tasks
  listBoardId: { type: String },
  listUserId: { type: String },
  created: { type: Date, default: Date.now },
});

const List = mongoose.model("List", listSchema);

export default List;

import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    point: { type: Number, default: 100 },
    dueDate: { type: Date, default: Date.now },
    availableUntilDate: { type: Date, default: Date.now },
    avaiableFromDate: { type: Date, default: Date.now },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Please provide course"],
    },
  },
  { collection: "assignments" }
);

export default assignmentSchema;

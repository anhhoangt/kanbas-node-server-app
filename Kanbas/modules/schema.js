import mongoose from "mongoose";
const moduleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    // modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "ModuleModel" }],
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseModel",
      required: [true, "Please provide course name"],
    },
  },
  { collection: "modules" }
);

export default moduleSchema;

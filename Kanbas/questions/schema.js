import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: { type: String },
    points: { type: Number, default: 1, required: true },
    questionText: { type: String, default: "" },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: [true, "Please provide quiz"],
    },
  },
  { collection: "questions" }
);

export default questionSchema;

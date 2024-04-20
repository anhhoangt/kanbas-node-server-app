import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    points: { type: Number, default: 1, required: true },
    questionText: { type: String, default: "" },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: [true, "Please provide quiz"],
    },
    // choices: [
    //   {
    //     isCorrect: { type: Boolean, default: false },
    //     text: { type: String },
    //   },
    // ],
    // questionType: {
    //   type: String,
    //   enum: ["TRUE_FALSE", "MULTIPLE_CHOICE", "FILL_BLANKS"],
    //   required: true,
    // },
  },
  { collection: "questions" }
);

// questionSchema.methods.addChoice = function (choice) {
//   this.choices.push(choice);
//   return this.save();
// };

// questionSchema.methods.updateChoice = function (index, choice) {
//   if (!this.choices[index]) {
//     throw Error(`No choice at index ${index}`);
//   }
//   this.choices[index] = choice;
//   return this.save();
// };

// questionSchema.methods.deleteChoice = function (index) {
//   const choices = this.choices.filter((_, i) => i !== index);
//   return this.quiz.updateOne({ choices });
// };

// // Get the correct answer index (0-based) for this question. Returns -1 if no correct answers exist.
// questionSchema.methods.getCorrectAnswerIndex = function () {
//   return this.choices.findIndex((choice) => choice.isCorrect);
// };

// // Marks a given answer as correct. If the question is a single-choice question, this method will also mark all other choices as incorrect.
// // Checks whether a given answer is correct. Returns true if the answer is correct, false otherwise.
// questionSchema.methods.checkAnswer = function (answer) {
//   if (this.questionType === "TRUE_FALSE") {
//     return this.choices[0].isCorrect === answer;
//   } else {
//     return this.choices[answer].isCorrect;
//   }
// };

export default questionSchema;

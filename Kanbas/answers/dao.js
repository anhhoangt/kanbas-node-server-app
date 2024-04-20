import model from "./model.js";

export const findAllAnswers = () => model.find();

export const createAnswer = (answer) => {
  delete answer._id;
  return model.create(answer);
};

export const findAnswersForQuestion = (questionId) =>
  model.find({ question: questionId });

export const updateAnswer = (answerId, answer) =>
  model.updateOne({ _id: answerId }, { $set: answer });

export const deleteAnswer = (answerId) => model.deleteOne({ _id: answerId });

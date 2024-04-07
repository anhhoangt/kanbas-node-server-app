import model from "./model.js";

export const createAssignment = (assignment) => {
  delete assignment._id;
  return model.create(assignment);
};

export const findAllAssignments = () => model.find();

export const findAssignmentById = (assignmentId) =>
  model.findOne({ id: assignmentId });

export const findAssignmentsForCourse = (courseId) =>
  model.find({ course: courseId });

export const updateAssignment = (assignmentId, assignment) =>
  model.updateOne({ _id: assignmentId }, { $set: assignment });

export const deleteAssignment = (assignmentId) =>
  model.deleteOne({ _id: assignmentId });

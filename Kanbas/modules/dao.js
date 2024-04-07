import model from "./model.js";

export const createModule = (module) => {
  delete module._id;
  return model.create(module);
};
// export const createModule = (req, res) => {
//   const module = req.body;
//   module.course = req.params.courseId;
//   delete module._id;
//   model.create(module, (err, newModule) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.json(newModule);
//     }
//   });
// };
export const findAllModules = () => model.find();
export const findModuleById = (moduleId) => model.findOne({ id: moduleId });
export const findModulesForCourse = (courseId) =>
  model.find({ course: courseId });
export const updateModule = (moduleId, module) =>
  model.updateOne({ _id: moduleId }, { $set: module });
export const deleteModule = (moduleId) => model.deleteOne({ _id: moduleId });

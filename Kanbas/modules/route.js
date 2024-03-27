import Database from "../Database/index.js";
export default function ModuleRoutes(app) {
  const fetchAllModules = (req, res) => {
    const modules = Database.modules;
    res.json(modules);
  };
  const findModuleById = (req, res) => {
    let id = req.params.id;
    if (!isNaN(Number(id))) {
      id = Number(id);
    } else {
      res.status(404).send(`Module ${id} not found`);
      return;
    }

    const module = Database.modules.find((module) => module._id === id);
    if (!module) {
      res.status(404).send(`Module ${id} not found`);
    } else {
      res.json(module);
    }
  };
  const findModulesForCourse = (req, res) => {
    const { courseId } = req.params;
    const modules = Database.modules.filter(
      (module) => module.course === courseId
    );
    res.json(modules);
  };
  const createModule = (req, res) => {
    // const module = { ...req.body, _id: Date.now().toString() };
    // Database.modules.push(module);
    // res.json(Database.modules);
    const { cid } = req.params;
    const newModule = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    Database.modules.push(newModule);
    res.send(newModule);
  };
  const updateModule = (req, res) => {
    const { mid } = req.params;
    const moduleIndex = Database.modules.findIndex((m) => m._id === mid);
    Database.modules[moduleIndex] = {
      ...Database.modules[moduleIndex],
      ...req.body,
    };
    res.sendStatus(200);
  };
  const deleteModule = (req, res) => {
    const { mid } = req.params;
    Database.modules = Database.modules.filter((m) => m._id !== mid);
    res.sendStatus(200);
  };

  app.get("/api/modules", fetchAllModules);
  app.get("/api/modules/:id", findModuleById);
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:cid/modules", createModule);
  app.put("/api/modules/:mid", updateModule);
  app.delete("/api/modules/:mid", deleteModule);
}

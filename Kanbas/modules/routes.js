// import Database from "../Database/index.js";
import * as dao from "./dao.js";

export default function ModuleRoutes(app) {
  //fetch all modules
  const fetchAllModules = async (req, res) => {
    // const modules = Database.modules;
    // res.json(modules);
    const modules = await dao.findAllModules();
    if (!modules || !modules.length) {
      res.status(404).send("No modules found");
    } else {
      res.json(modules);
    }
  };

  //find module by id
  const findModuleById = async (req, res) => {
    const module = await dao.findModuleById(req.params.id);
    if (!module) {
      res.status(404).send("Module not found");
    } else {
      res.json(module);
    }
  };
  //find modules for course
  const findModulesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const modules = await dao.findModulesForCourse(courseId);
    if (!modules || !modules.length) {
      res.status(404).send("No modules found");
    } else {
      res.json(modules);
    }
  };

  //create module
  const createModule = async (req, res) => {
    const module = await dao.createModule(req.body);
    res.json(module);
  };

  //update module
  const updateModule = async (req, res) => {
    // const { mid } = req.params;
    // const moduleIndex = Database.modules.findIndex((m) => m._id === mid);
    // Database.modules[moduleIndex] = {
    //   ...Database.modules[moduleIndex],
    //   ...req.body,
    // };
    // res.sendStatus(200);
    const { mid } = req.params;
    const module = req.body;
    const status = await dao.updateModule(mid, module);
    res.json(status);
  };

  //delete module
  const deleteModule = (req, res) => {
    const { mid } = req.params;
    // Database.modules = Database.modules.filter((m) => m._id !== mid);
    // res.sendStatus(200);
    const status = dao.deleteModule(mid);
    res.json(status);
  };

  app.get("/api/modules", fetchAllModules);
  app.get("/api/modules/:id", findModuleById);
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:cid/modules", createModule);
  app.put("/api/modules/:mid", updateModule);
  app.delete("/api/modules/:mid", deleteModule);
}

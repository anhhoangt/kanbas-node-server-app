// import Database from "../Database/index.js";
import * as dao from "./dao.js";

export default function AssignmentsRoutes(app) {
  const fetchAllAssignments = async (req, res) => {
    const assignments = await dao.findAllAssignments();
    if (!assignments) {
      res.status(404).send("No assignments found");
    } else {
      res.json(assignments);
    }
  };
  const findAssignmentById = async (req, res) => {
    const assignment = await dao.findAssignmentById(req.params.id);
    if (!assignment) {
      res.status(404).send("Assignment not found");
    } else {
      res.json(assignment);
    }
  };

  const findAssignmentsForCourse = async (req, res) => {
    const { courseId } = req.params.courseId;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    if (!assignments) {
      res.status(404).send("No assignments found");
    } else {
      res.json(assignments);
    }
  };

  const createAssignment = async (req, res) => {
    const courseId = req.params.cid;
    const assignmentData = req.body;
    try {
      assignmentData.course = courseId;
      const assignment = await dao.createAssignment(assignmentData);
      res.json(assignment);
    } catch (err) {
      res.sendStatus(500);
    }
  };

  const updateAssignment = async (req, res) => {
    const { aid } = req.params;
    const assignment = req.body;
    try {
      const updatedAssignment = await dao.updateAssignment(aid, assignment);
      res.json(updatedAssignment);
    } catch (err) {
      res.sendStatus(500);
    }
  };

  const deleteAssignment = async (req, res) => {
    const { aid } = req.params;
    const status = await dao.deleteAssignment(aid);
    res.json(status);
  };

  app.get("/api/assignments", fetchAllAssignments);
  app.get("/api/assignments/:id", findAssignmentById);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:cid/assignments", createAssignment);
  app.put("/api/assignments/:aid", updateAssignment);
  app.delete("/api/assignments/:aid", deleteAssignment);
}

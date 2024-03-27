import Database from "../Database/index.js";
export default function AssignmentsRoutes(app) {
  const fetchAllAssignments = (req, res) => {
    const assignments = Database.assignments;
    res.json(assignments);
  };
  const findAssignmentById = (req, res) => {
    const { aid } = req.params;

    const assignment = Database.assignments.find(
      (assignment) => assignment._id === aid
    );
    if (!assignment) {
      res.status(404).send(`Assignment ${aid} not found`);
    } else {
      res.json(assignment);
    }
  };
  const findAssignmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const assignments = Database.assignments.filter(
      (assignment) => assignment.course === courseId
    );
    res.json(assignments);
  };
  const createAssignment = (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    Database.assignments.push(newAssignment);
    res.send(newAssignment);
  };
  const updateAssignment = (req, res) => {
    const { aid } = req.params;
    const assignmentIndex = Database.assignments.findIndex(
      (a) => a._id === aid
    );
    Database.assignments[assignmentIndex] = {
      ...Database.assignments[assignmentIndex],
      ...req.body,
    };
    res.sendStatus(200);
  };
  const deleteAssignment = (req, res) => {
    const { aid } = req.params;
    Database.assignments = Database.assignments.filter((a) => a._id !== aid);
    res.sendStatus(200);
  };

  app.get("/api/assignments", fetchAllAssignments);
  app.get("/api/assignments/:id", findAssignmentById);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:cid/assignments", createAssignment);
  app.put("/api/assignments/:aid", updateAssignment);
  app.delete("/api/assignments/:aid", deleteAssignment);
}

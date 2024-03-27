import Database from "../Database/index.js";
export default function CourseRoutes(app) {
  const fetchAllCourses = (req, res) => {
    const courses = Database.courses;
    res.send(courses);
  };
  const findCourseById = (req, res) => {
    const courseId = req.params.id;
    const course = Database.courses.find((course) => course._id === courseId);
    if (course) {
      res.send(course);
    } else {
      res.status(404).send(`Course ${courseId} not found`);
    }
  };
  const createCourse = (req, res) => {
    const course = { ...req.body, _id: Date.now().toString() };
    Database.courses.push(course);
    res.json(Database.courses);
  };
  const updateCourse = (req, res) => {
    const courseId = req.params.id;
    const course = Database.courses.find((course) => course._id === courseId);
    if (course) {
      Object.assign(course, req.body);
      res.send(course);
    } else {
      res.status(404).send(`Course ${courseId} not found`);
    }
  };
  const deleteCourse = (req, res) => {
    const courseId = req.params.id;
    const courseIndex = Database.courses.findIndex(
      (course) => course._id === courseId
    );
    if (courseIndex !== -1) {
      Database.courses.splice(courseIndex, 1);
      res.json(Database.courses);
    } else {
      res.status(404).send(`Course ${courseId} not found`);
    }
  };
  app.get("/api/courses", fetchAllCourses);
  app.get("/api/courses/:id", findCourseById);
  app.post("/api/courses", createCourse);
  app.put("/api/courses/:id", updateCourse);
  app.delete("/api/courses/:id", deleteCourse);
}

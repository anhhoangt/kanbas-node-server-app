import * as dao from "./dao.js";
export default function CourseRoutes(app) {
  // fetch all courses
  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });

  // create course
  app.post("/api/courses", async (req, res) => {
    // const course = { ...req.body, _id: Date.now().toString() };
    // Database.courses.push(course);
    // res.send(Database.courses);
    const course = req.body;
    if (!course.name) {
      res.status(400).send("Course must have a title");
      return;
    }
    try {
      const courseCreated = await dao.createCourse(course);
      res.json(courseCreated);
    } catch (e) {
      res.status(500).send(`Error creating course: ${e}`);
    }
  });

  // update course by id
  app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const course = req.body;
    try {
      const updatedCourse = await dao.updateCourse(courseId, course);
      res.json(updatedCourse);
    } catch (e) {
      res.status(500).send(`Error updating course: ${e}`);
    }
  });

  // find course by id
  app.get("/api/courses/:courseId", async (req, res) => {
    const courseId = req.params.courseId;
    const course = await dao.findCourseById(courseId); // Database.courses;
    // const course = courses.find((course) => course._id === courseId);
    res.send(course);
  });

  //delete course by id
  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const deletedCourse = await dao.deleteCourse(courseId);
    res.json(deletedCourse);
    // Database.courses = Database.courses.filter(
    //   (course) => course._id !== courseId
    // );
    // res.send(Database.courses);
  });
}

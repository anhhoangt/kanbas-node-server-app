import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/courses/route.js";
import ModuleRoutes from "./Kanbas/modules/route.js";
import AssignmentsRoutes from "./Kanbas/assignments/route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
CourseRoutes(app);
ModuleRoutes(app);
AssignmentsRoutes(app);

Hello(app);
Lab5(app);
app.listen(4000);

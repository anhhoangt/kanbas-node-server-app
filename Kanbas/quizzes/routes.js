import * as dao from "./dao.js";

export default function QuizzesRoutes(app) {
  const fetchAllQuizzes = async (req, res) => {
    const quizzes = await dao.findAllQuizzes();
    if (!quizzes) {
      res.status(404).send("No quizzes found");
    } else {
      res.json(quizzes);
    }
  };
  const findQuizById = async (req, res) => {
    const quiz = await dao.findQuizById(req.params.id);
    if (!quiz) {
      res.status(404).send("Quiz not found");
    } else {
      res.json(quiz);
    }
  };

  const findQuizzesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.findQuizzesForCourse(courseId);
    if (!quizzes) {
      res.status(404).send("No quizzes found");
    } else {
      res.json(quizzes);
    }
  };

  const createQuiz = async (req, res) => {
    const courseId = req.params.cid;
    const quizData = req.body;
    try {
      quizData.course = courseId;
      const quiz = await dao.createQuiz(quizData);
      res.json(quiz);
    } catch (err) {
      res.sendStatus(500);
    }
  };

  const updateQuiz = async (req, res) => {
    const { qid } = req.params;
    const quiz = req.body;
    try {
      const updatedQuiz = await dao.updateQuiz(qid, quiz);
      res.json(updatedQuiz);
    } catch (err) {
      res.sendStatus(500);
    }
  };

  const deleteQuiz = async (req, res) => {
    const { qid } = req.params;
    const status = await dao.deleteQuiz(qid);
    res.json(status);
  };

  app.get("/api/quizzes", fetchAllQuizzes);
  app.get("/api/quizzes/:id", findQuizById);
  app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
  app.post("/api/courses/:cid/quizzes", createQuiz);
  app.put("/api/quizzes/:qid", updateQuiz);
  app.delete("/api/quizzes/:qid", deleteQuiz);
}

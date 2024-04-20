import * as dao from "./dao.js";

export default function QuestionsRoutes(app) {
  const fetchAllQuestions = async (req, res) => {
    const questions = await dao.findAllQuestions();
    if (!questions) {
      res.status(404).send("No questions found");
    } else {
      res.json(questions);
    }
  };
  const findQuestionById = async (req, res) => {
    const question = await dao.findQuestionById(req.params);
    if (!question) {
      res.status(404).send("Question not found");
    } else {
      res.json(question);
    }
  };

  const findQuestionsForQuiz = async (req, res) => {
    const { quizId } = req.params;
    const questions = await dao.findQuestionsForQuiz(quizId);
    if (!questions) {
      res.status(404).send("No questions found");
    } else {
      res.json(questions);
    }
  };

  const createQuestion = async (req, res) => {
    const { quizId } = req.params;
    const questionData = req.body;
    // console.log(questionData);
    // console.log(quizId);
    try {
      questionData.quiz = quizId;
      // console.log(questionData);
      const question = await dao.createQuestion(questionData);
      // console.log(question);
      res.json(question);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  };
  app.post("/api/quizzes/:quizId/questions", createQuestion);

  const updateQuestion = async (req, res) => {
    const { qid } = req.params;
    const question = req.body;
    try {
      const updatedQuestion = await dao.updateQuestion(qid, question);
      res.json(updatedQuestion);
    } catch (err) {
      res.sendStatus(500);
    }
  };

  const deleteQuestion = async (req, res) => {
    const { qid } = req.params;
    const status = await dao.deleteQuestion(qid);
    res.json(status);
  };
  app.get("/api/questions", fetchAllQuestions);
  app.get("/api/questions/:id", findQuestionById);
  app.get("/api/quizzes/:quizId/questions", findQuestionsForQuiz);

  app.put("/api/questions/:qid", updateQuestion);
  app.delete("/api/questions/:qid", deleteQuestion);

  //   const addChoice = async (req, res) => {
  //     const { qid } = req.params;
  //     const choiceData = req.body;
  //     const question = await dao.addChoice(qid, choiceData);
  //     res.json(question);
  //   };

  //   const updateChoice = async (req, res) => {
  //     const { qid, cid } = req.params;
  //     const choiceData = req.body;
  //     const question = await dao.updateChoice(qid, cid, choiceData);
  //     res.json(question);
  //   };

  //   const getCorrectAnswerIndex = async (req, res) => {
  //     const { aid } = req.params;
  //     const index = await dao.getCorrectAnswerIndex(aid);
  //     if (!index) return res.sendStatus(404);
  //     else res.json({ correct_answer_index: index });
  //   };

  //   const checkAnswer = async (req, res) => {
  //     const answerData = req.body;
  //     let result;
  //     try {
  //       result = await dao.checkAnswer(answerData.questionId, answerData.answer);
  //     } catch (e) {
  //       return res.sendStatus(404);
  //     }
  //     if (result === true) {
  //       // Correct Answer
  //       res.json({ is_correct: true });
  //     } else {
  //       // Incorrect Answer
  //       res.json({ is_correct: false });
  //     }
  //   };

  // const deleteChoice = async (req, res) => {
  //   const { qid, cid } = req.params;
  //   const question = await dao.deleteChoice(qid, cid);
  //   res.json(question);
  // };

  //   app.post("/api/questions/:qid/choices", addChoice);
  //   app.get("/api/questions/:aid/correct-answer-index", getCorrectAnswerIndex);
  //   app.post("/api/answers/check", checkAnswer);
  //   app.put("/api/questions/:qid/choices/:cid", updateChoice);
}

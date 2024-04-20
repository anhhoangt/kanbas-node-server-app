import * as dao from "./dao.js";

export default function AnswersRoutes(app) {
  const fetchAllAnswers = async (req, res) => {
    try {
      let answers = await dao.findAllAnswers();
      if (!answers) {
        throw new Error("No answer found");
      }
      res.status(200).json(answers);
    } catch (e) {
      console.log(`Error: ${e.message}`);
      res.status(400).send(e.message);
    }
  };
  app.get("/api/answers", fetchAllAnswers);

  const findAnswersForQuestion = async (req, res) => {
    const { questionId } = req.params;
    const answers = await dao.findAnswersForQuestion(questionId);
    if (!answers) {
      res.status(404).send("No answers found");
    } else {
      res.json(answers);
    }
  };
  app.get("/api/questions/:questionId/answers", findAnswersForQuestion);

  const createAnswer = async (req, res) => {
    const { questionId } = req.params;
    const answerData = req.body;
    // console.log(answerData);
    // console.log(questionId);
    try {
      answerData.question = questionId;
      // console.log(answerData);
      const answer = await dao.createAnswer(answerData);
      res.json(answer);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  };
  app.post("/api/questions/:questionId/answers", createAnswer);

  const updateAnswer = async (req, res) => {
    const { aid } = req.params;
    const answer = req.body;
    try {
      const updatedAnswer = await dao.updateAnswer(aid, answer);
      res.json(updatedAnswer);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  };
  app.put("/api/answers/:aid", updateAnswer);

  const deleteAnswer = async (req, res) => {
    const { aid } = req.params;
    const status = await dao.deleteAnswer(aid);
    res.json(status);
  };
  app.delete("/api/answers/:aid", deleteAnswer);
}

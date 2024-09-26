import express from "express";
import {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "../controllers/question.controller";
const QuestionRouter = express.Router();

QuestionRouter.post("/", createQuestion);
QuestionRouter.get("/", getQuestions);
QuestionRouter.get("/:id", getQuestionById);
QuestionRouter.put("/:id", updateQuestion);
QuestionRouter.delete("/:id", deleteQuestion);

export default QuestionRouter;

import express from "express";
import {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "../controllers/question.controller";
const question = express.Router();

question.post("/", createQuestion);
question.get("/", getQuestions);
question.get("/:id", getQuestionById);
question.put("/:id", updateQuestion);
question.delete("/:id", deleteQuestion);

export default question;

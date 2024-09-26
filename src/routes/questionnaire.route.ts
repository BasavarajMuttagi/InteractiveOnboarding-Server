import express from "express";
import {
  createQuestionnaire,
  getQuestionnaires,
  getQuestionnaireById,
  updateQuestionnaire,
  deleteQuestionnaire,
} from "../controllers/questionnaire.controller";
const QuestionnaireRouter = express.Router();

QuestionnaireRouter.post("/", createQuestionnaire);
QuestionnaireRouter.get("/", getQuestionnaires);
QuestionnaireRouter.get("/:id", getQuestionnaireById);
QuestionnaireRouter.put("/:id", updateQuestionnaire);
QuestionnaireRouter.delete("/:id", deleteQuestionnaire);

export default QuestionnaireRouter;

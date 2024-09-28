import express from "express";
import {
  getNextQuestion,
  startAttempt,
} from "../controllers/attempt.controller";
import { validateToken } from "../middlewares/auth.middleware";

const AttemptRouter = express.Router();

AttemptRouter.get("/start/:questionnaireId", validateToken, startAttempt);
AttemptRouter.post("/next", validateToken, getNextQuestion);

export default AttemptRouter;

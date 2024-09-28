import { Request, Response } from "express";
import { Attempt, Questionnaire } from "../models/schema";
import { tokenType } from "../middlewares/auth.middleware";

const startAttempt = async (req: Request, res: Response) => {
  try {
    const user = req.body.user as tokenType;
    const questionnaireId = req.params.questionnaireId;
    if (!questionnaireId) {
      res.status(400).json({ message: "Questionnaire ID is required" });
      return;
    }
    const questionnaire =
      await Questionnaire.findById(questionnaireId).populate("questions");
    if (!questionnaire) {
      res.status(404).json({ message: "Questionnaire not found" });
      return;
    }

    const previousAttempts = await Attempt.find({
      user: user.userId,
      questionnaire: questionnaireId,
    });
    const attemptNumber = previousAttempts.length + 1;

    const newAttempt = await Attempt.create({
      user: user.userId,
      questionnaire: questionnaireId,
      attemptNumber,
      responses: [],
    });

    const firstQuestion = questionnaire.questions[0];
    res.status(201).json({
      attemptId: newAttempt._id,
      totalQuestions: questionnaire.questions.length,
      currentQuestionNumber: 1,
      question: firstQuestion,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getNextQuestion = async (req: Request, res: Response) => {
  try {
    const { attemptId, answer } = req.body;

    const attempt = await Attempt.findById(attemptId).populate("questionnaire");
    if (!attempt) {
      res.status(404).json({ message: "Attempt not found" });
      return;
    }

    const questionnaire = await Questionnaire.findById(
      attempt.questionnaire,
    ).populate("questions");
    if (!questionnaire) {
      res.status(404).json({ message: "Questionnaire not found" });
      return;
    }

    if (attempt.responses.length >= questionnaire.questions.length) {
      res.json({
        message: "You have completed the questionnaire.",
      });
      return;
    }

    const currentQuestionIndex = attempt.responses.length;
    const currentQuestion = questionnaire.questions[currentQuestionIndex];

    const alreadyAnswered = attempt.responses.some((response) =>
      response.question.equals(currentQuestion._id),
    );

    if (!alreadyAnswered) {
      attempt.responses.push({
        question: currentQuestion._id,
        answer,
      });

      await attempt.save();
    }

    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex >= questionnaire.questions.length) {
      res.json({ message: "You have completed the questionnaire." });
      return;
    }

    const nextQuestion = questionnaire.questions[nextQuestionIndex];

    res.status(200).json({
      totalQuestions: questionnaire.questions.length,
      currentQuestionNumber: nextQuestionIndex + 1,
      question: nextQuestion,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export { startAttempt, getNextQuestion };

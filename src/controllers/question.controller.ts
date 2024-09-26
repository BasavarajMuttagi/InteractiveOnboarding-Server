import { Question, Questionnaire } from "../models/schema";
import { Request, Response } from "express";
const createQuestion = async (req: Request, res: Response) => {
  try {
    const newQuestion = await Question.create(req.body);
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getQuestionById = async (req: Request, res: Response) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      res.status(404).json({ message: "Question not found" });
      return;
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateQuestion = async (req: Request, res: Response) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!question) {
      res.status(404).json({ message: "Question not found" });
      return;
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    await Questionnaire.updateMany(
      { questions: req.params.id },
      { $pull: { questions: req.params.id } },
    );

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};

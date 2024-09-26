import { Request, Response } from "express";
import { Questionnaire } from "../models/schema";

const createQuestionnaire = async (req: Request, res: Response) => {
  try {
    const newQuestionnaire = await Questionnaire.create(req.body);
    res.status(201).json(newQuestionnaire);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const getQuestionnaires = async (req: Request, res: Response) => {
  try {
    const questionnaires = await Questionnaire.find().populate("questions");
    res.status(200).json(questionnaires);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getQuestionnaireById = async (req: Request, res: Response) => {
  try {
    const questionnaire = await Questionnaire.findById(req.params.id).populate(
      "questions",
    );
    if (!questionnaire) {
      res.status(404).json({ message: "Questionnaire not found" });
      return;
    }
    res.status(200).json(questionnaire);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateQuestionnaire = async (req: Request, res: Response) => {
  try {
    const questionnaire = await Questionnaire.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    ).populate("questions");
    if (!questionnaire) {
      res.status(404).json({ message: "Questionnaire not found" });
      return;
    }
    res.status(200).json(questionnaire);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const deleteQuestionnaire = async (req: Request, res: Response) => {
  try {
    const questionnaire = await Questionnaire.findByIdAndDelete(req.params.id);
    if (!questionnaire) {
      res.status(404).json({ message: "Questionnaire not found" });
      return;
    }
    res.status(200).json({ message: "Questionnaire deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export {
  createQuestionnaire,
  getQuestionnaires,
  getQuestionnaireById,
  updateQuestionnaire,
  deleteQuestionnaire,
};

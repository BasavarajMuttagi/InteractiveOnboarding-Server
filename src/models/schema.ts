import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const questionSchema = new Schema(
  {
    question: {
      text: {
        type: String,
        required: true,
      },
      subtext: {
        type: String,
        default: "",
      },
    },
    options: {
      type: [{ option: String, value: String }],
    },
    type: {
      type: String,
      enum: ["radio", "multiselect", "date"],
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const questionnaireSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
    ],
  },
  { timestamps: true },
);

const attemptSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questionnaire: {
      type: Schema.Types.ObjectId,
      ref: "Questionnaire",
      required: true,
    },
    attemptNumber: {
      type: Number,
      required: true,
    },
    responses: [
      {
        question: {
          type: Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        answer: {
          type: Schema.Types.Mixed,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

const Attempt = model("Attempt", attemptSchema);
const Questionnaire = model("Questionnaire", questionnaireSchema);
const Question = model("Question", questionSchema);
const User = model("User", userSchema);
export { User, Question, Questionnaire, Attempt };

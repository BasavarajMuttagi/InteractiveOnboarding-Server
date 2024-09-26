import express from "express";
import { validate } from "../middlewares/validate.middleware";
import { UserSignUpSchema, UserLoginSchema } from "../zod";
import { SignUpUser, LoginUser } from "../controllers/auth.controller";

const AuthRouter = express.Router();

AuthRouter.post("/signup", validate(UserSignUpSchema), SignUpUser);
AuthRouter.post("/login", validate(UserLoginSchema), LoginUser);

export default AuthRouter;

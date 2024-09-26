import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { User } from "../models/schema";
import { sign } from "jsonwebtoken";
import { SECRET_SALT } from "../..";
import { UserSignUpType, UserLoginType } from "../zod";

const SignUpUser = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password } = req.body as UserSignUpType;
    const isUserExists = await User.exists({ email });
    if (isUserExists) {
      res.status(409).send({ message: "Account Exists!" });
      return;
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    const record = await User.create({
      firstname,
      lastname,
      email,
      password: encryptedPassword,
    });

    res.status(201).send({ message: "Account Created Successfully!", record });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Occurred, Please Try Again!", error });
  }
};

const LoginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as UserLoginType;
    const UserRecord = await User.findOne({ email });
    if (!UserRecord) {
      res.status(409).send({ message: "User Not Found!" });
      return;
    }
    const fullname = `${UserRecord.firstname} ${UserRecord.lastname}`;
    const isPasswordMatch = await bcrypt.compare(
      password,
      UserRecord.password as string,
    );
    if (!isPasswordMatch) {
      res.status(400).send({ message: "Email or password incorrect" });
      return;
    }
    const token = sign(
      {
        userId: UserRecord.id,
        email: UserRecord.email,
        name: fullname,
      },
      SECRET_SALT,
      { expiresIn: "1h" },
    );
    res.status(200).send({
      user: {
        displayName: fullname,
        email: UserRecord.email,
        token: token,
      },
      message: "Logged in successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error Occurred, Please Try Again!" });
  }
};

export { SignUpUser, LoginUser };

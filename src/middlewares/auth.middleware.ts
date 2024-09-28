import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { SECRET_SALT } from "../..";

export type tokenType = {
  userId: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: "Unauthorized: Token missing" });
    return;
  }

  token = token.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_SALT) as tokenType;
    req.body.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized: Invalid token", err });
    return;
  }
};

export { validateToken };

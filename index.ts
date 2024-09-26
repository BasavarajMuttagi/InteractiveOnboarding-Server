import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "./src/routes/auth.route";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
export const SECRET_SALT = process.env.SECRET_SALT as string;
app.use(cors());
app.use(express.json());
app.use("/auth", AuthRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;

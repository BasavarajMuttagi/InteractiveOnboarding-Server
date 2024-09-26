import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "./src/routes/auth.route";
import { connect } from "mongoose";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
export const SECRET_SALT = process.env.SECRET_SALT as string;
const DATABASE_URL = process.env.DATABASE_URL as string;
app.use(cors());
app.use(express.json());
app.use("/auth", AuthRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

async function main() {
  try {
    await connect(DATABASE_URL).then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

main();

export default app;

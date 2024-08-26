import express, { Request, Response } from "express";
import { config } from "dotenv";
import { connectToMongoDB } from "./libs/mongodb";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/index.middleware";

config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

connectToMongoDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.use(notFound);
app.use(errorHandler);

export default app;

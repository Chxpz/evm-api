import express, { Request, Response, NextFunction, Application } from "express";
import router from "./routes";
import errorMiddleware from "@middlewares/errorMiddleware";

const app: Application = express();

app.use(express.json());

app.use("/api", router);

// Error handling middleware
app.use(errorMiddleware);

export default app;

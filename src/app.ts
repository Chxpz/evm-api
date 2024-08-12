import express, { Application } from "express";
import balanceRoutes from "@routes/balanceRoutes";
import priceRoutes from "@routes/priceRoutes";
import errorMiddleware from "@middlewares/errorMiddleware";

const app: Application = express();

const apiRouter = express.Router();

app.use(express.json());
// app.use("/balance", balanceRoutes);
// app.use("/price", priceRoutes);

app.use("/api", apiRouter);
// Error handling middleware
app.use(errorMiddleware);

export default app;

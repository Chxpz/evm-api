import { Router } from "express";
import { getBalanceController } from "@controllers/balanceController";

const router = Router();

router.post("/balance", getBalanceController);

export default router;

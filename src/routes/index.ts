import { Router } from "express";
import {
  getPriceController,
  erc20BalanceController,
  EthBalanceController,
} from "@controllers/index";

const router = Router();

router.post("/get-erc20-balance", erc20BalanceController);

router.post("/get-eth-balance", EthBalanceController);

router.post("/get-price", getPriceController);

export default router;

import { Request, Response, NextFunction } from "express";
import { getEthBalanceHandler } from "@handlers/ethBalanceHandler";
import { ethers } from "ethers";
import { GetErc20BalanceControllerParams } from "types";

export type GetEthBalanceControllerParams = {
  addresses: string[];
};

export const EthBalanceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { addresses } = req.body as GetEthBalanceControllerParams;
    const balances = await getEthBalanceHandler(addresses, ethers);
    res.send(balances);
  } catch (error) {
    next(error);
  }
};

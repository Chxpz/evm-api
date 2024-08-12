import { Request, Response, NextFunction } from "express";
import { getEthBalanceHandler } from "@handlers/ethBalanceHandler";
import { ethers } from "ethers";
import { GetEthBalanceControllerParams } from "types";

export const EthBalanceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { addresses, blockTag } = req.body as GetEthBalanceControllerParams;
    const balances = await getEthBalanceHandler(
      addresses,
      ethers,
      blockTag ? +blockTag : "latest"
    );
    res.send(balances);
  } catch (error) {
    next(error);
  }
};

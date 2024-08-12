import { Request, Response, NextFunction } from "express";
import { getErc20BalanceHandler } from "@handlers/erc20BalanceHandler";
import { ethers } from "ethers";
import { GetErc20BalanceControllerParams } from "types";

export const erc20BalanceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { addresses, contractAddress } =
      req.body as GetErc20BalanceControllerParams;
    const balances = await getErc20BalanceHandler(
      addresses,
      ethers,
      contractAddress
    );
    res.send(balances);
  } catch (error) {
    next(error);
  }
};

import { Request, Response, NextFunction } from "express";
import { getBalance } from "@handlers/balanceHandler";

export const getBalanceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { address } = req.params;
    const balance = await getBalance(address);
    res.json({ balance });
  } catch (error) {
    next(error);
  }
};

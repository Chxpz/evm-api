import { Request, Response, NextFunction } from "express";
import { getTokenPrice } from "@handlers/priceHandler";

export const getPriceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tokenAddress } = req.params;
    const price = await getTokenPrice(tokenAddress);
    res.json({ price });
  } catch (error) {
    next(error);
  }
};

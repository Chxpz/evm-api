import { BigNumberish } from "ethers";
import { getBalanceFromBlockchain } from "@services/blockchain";

export const getBalance = async (address: string): Promise<string> => {
  const balance: BigNumberish = await getBalanceFromBlockchain(address);
  return balance.toString();
};

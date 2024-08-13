import dotenv from "dotenv";
import { getErc20Balance, getProvider } from "@services/blockchain";
import { Ethers, GetBalanceData } from "types";

dotenv.config();

export const getErc20BalanceHandler = async (
  address: string[],
  ethers: Ethers,
  contractAddress: string,
  blockTag: number | string
): Promise<GetBalanceData> => {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY not found in .env file");
  }

  const provider = await getProvider({
    ethers,
    providerUrl: process.env.PROVIDER_URL as string,
  });

  const balance: GetBalanceData = await getErc20Balance(
    address,
    ethers,
    provider,
    contractAddress,
    blockTag
  );

  return balance;
};

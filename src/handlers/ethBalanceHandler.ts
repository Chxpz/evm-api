import dotenv from "dotenv";
import { getEthBalance, getProvider } from "@services/blockchain";
import { Ethers, GetBalanceData } from "types";

dotenv.config();

export const getEthBalanceHandler = async (
  address: string[],
  ethers: Ethers
): Promise<GetBalanceData> => {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY not found in .env file");
  }

  const provider = await getProvider({
    ethers,
    providerUrl: process.env.PROVIDER_URL as string,
  });

  const balance: GetBalanceData = await getEthBalance(
    address,
    provider,
    ethers
  );
  return balance;
};

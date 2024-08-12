import dotenv from "dotenv";
import { getErc20Balance } from "@services/blockchain";
import { getSigner } from "@services/blockchain/utils/getSigner";
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

  const signer = await getSigner({
    ethers,
    privateKey: process.env.PRIVATE_KEY as string,
  });

  const balance: GetBalanceData = await getErc20Balance(
    address,
    ethers,
    signer,
    contractAddress,
    blockTag
  );

  return balance;
};

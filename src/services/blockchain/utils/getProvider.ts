import dotenv from "dotenv";
import { GetProviderParams } from "types";

dotenv.config();

export const getProvider = async ({
  ethers,
  providerUrl,
}: GetProviderParams) => {
  return new ethers.JsonRpcProvider(providerUrl);
};

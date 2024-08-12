import { BigNumberish } from "ethers";
import { getPriceFromBlockchain } from "@services/blockchain/erc20Service";

export const getTokenPrice = async (tokenAddress: string): Promise<string> => {
  const price: BigNumberish = await getPriceFromBlockchain(tokenAddress);
  return price.toString();
};

import { Contract, Signer } from "ethers";
import { GetContractParams } from "types";

export const getContract = async ({
  ethers,
  signer,
  contractAddress,
  abi,
}: GetContractParams): Promise<Contract> => {
  try {
    const contract = new ethers.Contract(contractAddress, abi, signer);
    return contract;
  } catch (error) {
    console.error("Error in getContract:", error);
    throw error;
  }
};

import { GetContractParams, ContractType } from "types";

export const getContract = async ({
  ethers,
  provider,
  contractAddress,
  abi,
}: GetContractParams): Promise<ContractType> => {
  try {
    return new ethers.Contract(contractAddress, abi, provider);
  } catch (error: any) {
    throw new Error(`Error fetching contract: ${error.message}`);
  }
};

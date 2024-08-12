import { ContractResponse, readStateParams } from "types";

export const readState = async ({
  contract,
  functionName,
  functionArgs,
}: readStateParams): Promise<any> => {
  try {
    return await contract[functionName](...functionArgs);
  } catch (error: any) {
    console.error("Error in readState:", error);
    return error;
  }
};

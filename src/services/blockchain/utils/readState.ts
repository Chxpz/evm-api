import { readStateParams } from "types";

export const readState = async ({
  contract,
  functionName,
  functionArgs,
  blockTag,
}: readStateParams): Promise<any> => {
  try {
    return await contract[functionName](...functionArgs, { blockTag });
  } catch (error: any) {
    console.error("Error in readState:", error);
    return error;
  }
};

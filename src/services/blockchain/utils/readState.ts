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
    return { error: error.message };
  }
};

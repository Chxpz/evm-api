import { Provider } from "types";

export const checkDeploy = async (
  contractAddress: string,
  provider: Provider,
  blockTag: number
) => {
  let endBlock = await provider.getBlockNumber();
  let startBlock = 0;

  while (startBlock <= endBlock) {
    const middleBlock = Math.floor((startBlock + endBlock) / 2);
    const codeAtMiddleBlock = await provider.getCode(
      contractAddress,
      middleBlock
    );

    if (codeAtMiddleBlock.length > 2) {
      endBlock = middleBlock - 1;
    } else {
      startBlock = middleBlock + 1;
    }
  }

  const codeAtStartBlock = await provider.getCode(contractAddress, startBlock);

  const deploymentBlock = codeAtStartBlock.length > 2 ? startBlock : -1;

  return deploymentBlock - 1 > blockTag ? true : false;
};

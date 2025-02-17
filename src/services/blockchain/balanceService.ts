import { GetBalanceData, BigNumberish, Ethers, Signer, Provider } from "types";
import { readState, getContract, checkDeploy } from "@services/blockchain";

const configContract = {
  functionName: "balanceOf",
  abi: ["function balanceOf(address owner) view returns (uint256)"],
};

export const getErc20Balance = async (
  addresses: string[],
  ethers: Ethers,
  provider: Provider,
  contractAddress: string,
  blockTag: number | string
): Promise<GetBalanceData> => {
  console.log("Checking ERC20 Balance");

  if (!addresses || addresses.length === 0) {
    throw new Error("No addresses provided");
  }

  if (!provider) {
    throw new Error("No provider found");
  }

  if (await checkDeploy(contractAddress, provider, +blockTag)) {
    throw new Error("Contract not deployed yet");
  }

  const results = await Promise.all(
    addresses.map(async (address) => {
      try {
        const contract = await getContract({
          ethers,
          provider,
          contractAddress,
          abi: configContract.abi,
        });

        const ret = await readState({
          contract,
          functionName: configContract.functionName,
          functionArgs: [address],
          blockTag,
        });

        return {
          address,
          balance: ethers.formatEther(ret) || (0 as BigNumberish),
        };
      } catch (error) {
        console.error(`Error fetching balance for ${address}:`, error);
        return {
          address,
          balance: 0 as BigNumberish,
        };
      }
    })
  );
  console.log("Done");
  return {
    data: {
      results,
    },
  };
};

export const getEthBalance = async (
  addresses: string[],
  provider: Provider,
  ethers: Ethers,
  blockTag: number | string
): Promise<GetBalanceData> => {
  console.log("Checking ETH Balance");

  if (!addresses || addresses.length === 0) {
    throw new Error("No addresses provided");
  }

  const results = await Promise.all(
    addresses.map(async (address) => {
      try {
        const balanceWei = await provider.getBalance(address, blockTag); // Adicionado blockTag

        const balance = ethers.formatEther(balanceWei);

        return {
          address,
          balance: balance as BigNumberish,
        };
      } catch (error) {
        console.error(`Error fetching balance for ${address}:`, error);
        return {
          address,
          balance: 0 as BigNumberish,
        };
      }
    })
  );

  console.log("Done");

  return {
    data: {
      results,
    },
  };
};

import {
  GetBalanceData,
  BigNumberish,
  Ethers,
  Signer,
  ContractResponse,
  Provider,
} from "types";
import { readState, getContract } from "@services/blockchain";
import exp from "constants";

const configContract = {
  functionName: "balanceOf",
  abi: ["function balanceOf(address owner) view returns (uint256)"],
};

export const getErc20Balance = async (
  addresses: string[],
  ethers: Ethers,
  signer: Signer,
  contractAddress: string
): Promise<GetBalanceData> => {
  if (!addresses || addresses.length === 0) {
    throw new Error("No addresses provided");
  }
  const results = await Promise.all(
    addresses.map(async (address) => {
      try {
        const contract = await getContract({
          ethers,
          signer,
          contractAddress,
          abi: configContract.abi,
        });

        const ret = await readState({
          contract,
          functionName: configContract.functionName,
          functionArgs: [address],
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

  return {
    data: {
      results,
    },
  };
};

//Return the ETH balance of the address
export const getEthBalance = async (
  addresses: string[],
  provider: Provider,
  ethers: Ethers
): Promise<GetBalanceData> => {
  if (!addresses || addresses.length === 0) {
    throw new Error("No addresses provided");
  }

  const results = await Promise.all(
    addresses.map(async (address) => {
      try {
        const balanceWei = await provider.getBalance(address);

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

  return {
    data: {
      results,
    },
  };
};

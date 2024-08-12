import { ethers, Contract } from "ethers";

export interface BlockchainService {
  getBalanceFromBlockchain(address: string): Promise<BigNumberish>;
  getPriceFromBlockchain(tokenAddress: string): Promise<BigNumberish>;
}

export type Ethers = typeof ethers;

export type Signer = ethers.Signer;

export type BigNumberish = ethers.BigNumberish;

export type Provider = ethers.JsonRpcProvider;

export type GetProviderParams = {
  ethers: Ethers;
  providerUrl: string;
};

export type GetSignerParams = {
  ethers: Ethers;
  privateKey: string;
};

export type ContractType = Contract;

export type readStateParams = {
  contract: Contract;
  functionName: string;
  functionArgs: any[];
  blockTag?: number | string;
};

export type GetContractParams = {
  ethers: Ethers;
  signer: Signer;
  contractAddress: string;
  abi: any;
};

export type ContractResponse = {
  ret: any;
};

export type GetBalanceData = {
  data: {
    results: {
      address: string;
      balance: BigNumberish;
    }[];
  };
};

export type GetErc20BalanceControllerParams = {
  addresses: string[];
  contractAddress: string;
  blockTag?: number | string;
};

export type GetEthBalanceControllerParams = {
  addresses: string[];
  blockTag?: number | string;
};

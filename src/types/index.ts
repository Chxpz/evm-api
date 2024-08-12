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
};

export type GetContractParams = {
  ethers: Ethers;
  signer: Signer;
  contractAddress: string;
  abi: any;
};

export type ContractResponse = {
  result: any;
  error: string | null;
};

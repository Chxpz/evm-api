import request from "supertest";
import app from "../../app";
import { ethers } from "ethers";
import { getEthBalanceHandler } from "@handlers/ethBalanceHandler";
import { getErc20BalanceHandler } from "@handlers/erc20BalanceHandler";

import {
  getErc20Balance,
  getEthBalance,
} from "@services/blockchain/balanceService";

import { checkDeploy, getContract, readState } from "@services/blockchain";

jest.mock("@handlers/ethBalanceHandler");
jest.mock("@handlers/erc20BalanceHandler");

jest.mock("@services/blockchain/balanceService", () => ({
  getErc20Balance: jest.fn(),
  getEthBalance: jest.fn(),
}));

describe("Balance Service Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return ERC20 balance from the controller", async () => {
    const mockBalanceData = {
      data: {
        results: [{ address: "0xaddress1", balance: "100.0" }],
      },
    };

    (getErc20BalanceHandler as jest.Mock).mockResolvedValue(mockBalanceData);

    const response = await request(app)
      .post("/api/get-erc20-balance")
      .send({
        addresses: ["0xaddress1"],
        contractAddress: "0xcontractAddress",
        blockTag: 13000000,
      });

    expect(response.status).toBe(200);
    expect(response.body.data.results[0].balance).toBe("100.0");
    expect(getErc20BalanceHandler).toHaveBeenCalledWith(
      ["0xaddress1"],
      ethers,
      "0xcontractAddress",
      13000000
    );
  });

  it("should return ETH balance from the controller", async () => {
    const mockEthBalance = {
      data: {
        results: [{ address: "0xaddress2", balance: "1.0" }],
      },
    };

    (getEthBalanceHandler as jest.Mock).mockResolvedValue(mockEthBalance);

    const response = await request(app)
      .post("/api/get-eth-balance")
      .send({ addresses: ["0xaddress2"], blockTag: 13000000 });

    expect(response.status).toBe(200);
    expect(response.body.data.results[0].balance).toBe("1.0");
    expect(getEthBalanceHandler).toHaveBeenCalledWith(
      ["0xaddress2"],
      ethers,
      13000000
    );
  });

  it("should handle errors in ERC20 balance request", async () => {
    (getErc20BalanceHandler as jest.Mock).mockRejectedValue(
      new Error("Contract not deployed yet")
    );

    const response = await request(app)
      .post("/api/get-erc20-balance")
      .send({
        addresses: ["0xaddress1"],
        contractAddress: "0xcontractAddress",
        blockTag: 13000000,
      });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Contract not deployed yet");
  });

  //   it("should handle errors in ETH balance request", async () => {
  //     (getEthBalanceHandler as jest.Mock).mockRejectedValue(
  //       new Error("Failed to get balance")
  //     );

  //     const response = await request(app)
  //       .post("/api/get-eth-balance")
  //       .send({ addresses: ["0xaddress2"], blockTag: 13000000 });

  //     expect(response.status).toBe(500);
  //     expect(response.body.message).toBe("Failed to get balance");
  //   });
});

// describe("balanceService additional tests", () => {
//   it("should throw error if addresses array is empty in getErc20Balance", async () => {
//     await expect(
//       getErc20Balance([], ethers, {} as any, "0xContractAddress", 13000000)
//     ).rejects.toThrow("No addresses provided");
//   });

//   it("should throw error if provider is not found in getErc20Balance", async () => {
//     await expect(
//       getErc20Balance(
//         ["0xaddress1"],
//         ethers,
//         null as any,
//         "0xContractAddress",
//         13000000
//       )
//     ).rejects.toThrow("No provider found");
//   });

//   it("should throw error if contract not deployed in getErc20Balance", async () => {
//     jest.mocked(checkDeploy).mockResolvedValue(true);
//     await expect(
//       getErc20Balance(
//         ["0xaddress1"],
//         ethers,
//         {} as any,
//         "0xContractAddress",
//         13000000
//       )
//     ).rejects.toThrow("Contract not deployed yet");
//   });

//   it("should throw error if addresses array is empty in getEthBalance", async () => {
//     await expect(
//       getEthBalance([], {} as any, ethers, 13000000)
//     ).rejects.toThrow("No addresses provided");
//   });
// });

describe("checkDeploy function tests", () => {
  const mockProvider = {
    getCode: jest.fn(),
  } as unknown as ethers.Provider;

  //   it("should return false if contract is deployed", async () => {
  //     mockProvider.getCode.mockResolvedValue("0x123456");
  //     const result = await checkDeploy(
  //       "0xContractAddress",
  //       mockProvider,
  //       13000000
  //     );
  //     expect(result).toBe(false);
  //   });

  //   it("should return true if contract is not deployed", async () => {
  //     mockProvider.getCode.mockResolvedValue("0x");
  //     const result = await checkDeploy(
  //       "0xContractAddress",
  //       mockProvider,
  //       13000000
  //     );
  //     expect(result).toBe(true);
  //   });

  //   it("should handle errors gracefully", async () => {
  //     mockProvider.getCode.mockRejectedValue(new Error("Provider error"));
  //     await expect(
  //       checkDeploy("0xContractAddress", mockProvider, 13000000)
  //     ).rejects.toThrow("Provider error");
  //   });
  // });

  describe("getContract function tests", () => {
    it("should create a contract with valid parameters", async () => {
      const mockProvider = new ethers.JsonRpcProvider();
      const contract = await getContract({
        ethers,
        provider: mockProvider,
        contractAddress: "0xContractAddress",
        abi: ["function balanceOf(address owner) view returns (uint256)"],
      });
      console.log("contract", contract.address);
      //   expect(contract.address).toBe("0xContractAddress");
    });

    it("should throw an error with invalid parameters", async () => {
      await expect(
        getContract({
          ethers,
          provider: null as any,
          contractAddress: "",
          abi: [],
        })
      ).rejects.toThrow();
    });
  });

  describe("readState function tests", () => {
    it("should return correct value from contract", async () => {
      const mockContract = {
        balanceOf: jest.fn().mockResolvedValue("1000000000000000000"),
      } as unknown as ethers.Contract;
      const result = await readState({
        contract: mockContract,
        functionName: "balanceOf",
        functionArgs: ["0xAddress"],
        blockTag: "latest",
      });
      expect(result).toBe("1000000000000000000");
    });

    it("should handle errors in contract calls", async () => {
      const mockContract = {
        balanceOf: jest.fn().mockRejectedValue(new Error("Contract error")),
      } as unknown as ethers.Contract;
      const result = await readState({
        contract: mockContract,
        functionName: "balanceOf",
        functionArgs: ["0xAddress"],
        blockTag: "latest",
      });
      expect(result).toEqual({ error: "Contract error" });
    });
  });

  describe("Balance Handlers additional tests", () => {
    it("should return correct balance from getErc20BalanceHandler", async () => {
      process.env.PRIVATE_KEY = "dummy_key";
      const mockBalanceData = {
        data: {
          results: [{ address: "0xaddress1", balance: "100.0" }],
        },
      };
      jest.mocked(getErc20Balance).mockResolvedValue(mockBalanceData);
      const result = await getErc20BalanceHandler(
        ["0xaddress1"],
        ethers,
        "0xcontractAddress",
        13000000
      );
      expect(result).toEqual(mockBalanceData);
    });

    it("should return correct balance from getEthBalanceHandler", async () => {
      const mockBalanceData = {
        data: {
          results: [{ address: "0xaddress2", balance: "1.0" }],
        },
      };
      jest.mocked(getEthBalance).mockResolvedValue(mockBalanceData);
      const result = await getEthBalanceHandler(
        ["0xaddress1"],
        ethers,
        13000000
      );

      expect(result.data).toEqual(mockBalanceData.data);
    });
  });
});

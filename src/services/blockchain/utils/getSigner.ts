import dotenv from "dotenv";
import { getProvider } from "./getProvider";
import { GetSignerParams } from "types";

dotenv.config();

export const getSigner = async ({ ethers, privateKey }: GetSignerParams) => {
  try {
    const providerUrl = process.env.PROVIDER_URL as string;
    const provider = await getProvider({ ethers, providerUrl });
    const wallet = new ethers.Wallet(privateKey, provider);
    const signer = wallet.connect(provider);
    return signer;
  } catch (err) {
    console.error("Error in getSigner:", err);
    throw err;
  }
};

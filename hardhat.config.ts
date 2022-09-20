import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("@nomiclabs/hardhat-etherscan");

const dotenv = require("dotenv");
dotenv.config();

const config = {
  solidity: "0.8.17",
  networks: {
    rinkeby: {
      url: process.env.NEXT_PUBLIC_RINKEBY_RPC_URL,
      accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.NEXT_PUBLIC_ETHERSCAN_KEY,
  },
};

export default config;

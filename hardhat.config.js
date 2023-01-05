const { version } = require("chai");

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("@nomiclabs/hardhat-solhint");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
/** @type import('hardhat/config').HardhatUserConfig */

const { RPC_URL_goerli, privateKey, eth_apiKey, coinmarcap_apikey } =
  process.env;
module.exports = {
  solidity: {
    compilers: [{ version: "0.8.17" }, { version: "0.6.6" }],
  },
  defaultNetwork: "hardhat",
  networks: {
    georli: {
      url: RPC_URL_goerli,
      accounts: [privateKey],
      chainId: 5,
      blockConfirmations: 6,
    },
    /*,
    gasReporter: {
      enabled: true,
      currency: "USD",
      coinmarketcap: coinmarcap_apikey,
    }, */
  },
  etherscan: {
    url: "https://api-goerli.etherscan.io/",
    apiKey: "DSVUN2IVQ1GIK1FW83HKH5Y2UBG2W1AM3W",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};

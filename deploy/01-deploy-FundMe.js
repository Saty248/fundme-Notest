const { networkConfig, developmentchain } = require("../helper-hardhat-config");
const { network } = require("hardhat");
const { verify } = require("../utils/verify");
require("dotenv").config();
module.exports = async (hre) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  let pricefeedAdd;
  if (developmentchain.includes(network.name)) {
    const ethusdagg = await deployments.get("MockV3Aggregator");
    pricefeedAdd = ethusdagg.address;
  } else {
    pricefeedAdd = networkConfig[chainId]["pricefeed"];
  }
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [pricefeedAdd],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (!developmentchain.includes(network.name) && process.env.eth_apiKey) {
    await verify(fundMe.address, [pricefeedAdd]);
  }
  //when going for local host or hardhat we use mocks
};
module.exports.tags = ["all", "fundme"];

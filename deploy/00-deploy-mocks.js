const { developmentchain } = require("../helper-hardhat-config");
const { network } = require("hardhat");
const decimals = 8;
const initial_ans = 200000000000;
module.exports = async (hre) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  if (developmentchain.includes(network.name)) {
    log("local network detected");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [decimals, initial_ans],
    });
    log("---------------------------------------------------");
  }
};
module.exports.tags = ["all", "mocks"];

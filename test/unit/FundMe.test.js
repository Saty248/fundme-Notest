const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert } = require("chai");
describe("FundMe", async function () {
  let fundMe;
  let deployer;
  let MockV3Aggregator;
  beforeEach(async function () {
    await deployments.fixture(["all"]);
    deployer = (await getNamedAccounts()).deployer;
    fundMe = await ethers.getContract("FundMe", deployer); //gets most recently deployed fundme contract
    MockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);
  });

  describe("constructor", async function () {
    it("checks the aggregator address", async function () {
      const res = await fundMe.getPriceFeed();

      assert.equal(res, MockV3Aggregator.address);
    });
  });
});

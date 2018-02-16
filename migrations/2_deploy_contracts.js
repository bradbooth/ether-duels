var etherduel = artifacts.require("etherduel");

module.exports = function(deployer) {
  deployer.deploy(etherduel);
};
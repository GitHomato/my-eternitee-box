const MissionValidator = artifacts.require("MissionValidator");

module.exports = function (deployer) {
  deployer.deploy(MissionValidator);
  //deployer.deploy(Hours);
};
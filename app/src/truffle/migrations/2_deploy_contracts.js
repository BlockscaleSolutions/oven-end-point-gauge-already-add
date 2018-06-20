const Debt = artifacts.require('./Debt.sol');

module.exports = (deployer) => {
  deployer.deploy(Debt);
};

const MiniDonationRegistry = artifacts.require('./MiniDonationRegistry.sol');
const DaiMock = artifacts.require('./DaiMock.sol'); // Mock dai token for testing purposes
let daiAddress; // define for registry in order to transfer

module.exports = (deployer, network, accounts) => {
  const [owner] = accounts;

  deployer.deploy(DaiMock, { from: owner }).then(() => {
    return deployer.deploy(MiniDonationRegistry, DaiMock.address, { from: owner });

  }).then(() => {
    return DaiMock.deployed();

  }).then((daiMock) => {
    // Give our contract a balance to play with
    return daiMock.mint(MiniDonationRegistry.address, 1e30);

  }).then(() => {
    // Give our contract a balance to play with
    return MiniDonationRegistry.deployed();
    
  }).then((registry) => {
    // Give our contract a balance to play with
    return registry.setAvailableReserve();
  });
};

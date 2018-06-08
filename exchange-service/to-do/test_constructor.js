const DaiMock = artifacts.require('./DaiMock.sol');
const DonationRegistry = artifacts.require('./DonationRegistry.sol');

contract('DonationRegistry.constructor()', () => {
  it.skip('should successfully create a new registry with the correct dai address', async () => {
    const daiMock = await DaiMock.new();
    const donationRegistry = await DonationRegistry.new(daiMock.address);

    const daiAddress = await donationRegistry.dai_();

    assert.strictEqual(daiAddress, daiMock.address, 'dai is incorrect');
  });
});

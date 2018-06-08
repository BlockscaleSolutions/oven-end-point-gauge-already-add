const DonationRegistry = artifacts.require('./DonationRegistry.sol');
const DaiMock = artifacts.require('./DaiMock.sol');

contract('DonationRegistry.donateEth()', (accounts) => {

  describe('Sending a sufficient amount of eth', () => {
    it.skip('should successfully donateEth converting to dai and sending to recipient', async () => {
      const recipient = accounts[1];
      const donor = accounts[2];

      const daiMock = await DaiMock.new();
      const donationRegistry = await DonationRegistry.new(daiMock.address);
      await daiMock.approve(donationRegistry.address, 1e30);

      const res = await donationRegistry.donateEth(recipient, { from: donor, value: 1e18 });

      console.log(res);
      console.log(res.logs[0].args.amount.toNumber());
      console.log(res.logs[0].args.amount.toNumber());
      console.log(res.logs[0].args.amount.toNumber());
      console.log(res.logs[0].args.amount.toNumber());

      console.log((await daiMock.balanceOf(accounts[1])).toNumber());
      console.log((await daiMock.balanceOf(accounts[1])).toNumber());
      console.log((await daiMock.balanceOf(accounts[1])).toNumber());
      console.log((await daiMock.balanceOf(accounts[1])).toNumber());


      // assert.strictEqual(daiAddress, daiMock.address, 'dai is incorrect');
    });
  });

});

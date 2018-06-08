const MiniDonationRegistry = artifacts.require('./MiniDonationRegistry.sol');
const DaiMock = artifacts.require('./DaiMock.sol');
let daiMock;
let donationRegistry;

contract('MiniDonationRegistry.makeDonation()', (accounts) => {
  beforeEach(async () => {
    daiMock = await DaiMock.new();
    donationRegistry = await MiniDonationRegistry.new();
    await daiMock.mint(donationRegistry.address, 1e30);
  });

  describe('Sending a valid donation transaction', () => {
    const [_, recipient] = accounts;
    const transferAmount = 1e10;

    it('should transfer tokens from the registry to the to address', async () => {
      await donationRegistry.makeDonation(recipient, daiMock.address, transferAmount);

      const contractBalance = (await daiMock.balanceOf(donationRegistry.address)).toNumber();
      const recipientBalance = (await daiMock.balanceOf(recipient)).toNumber();

      assert.strictEqual(contractBalance, 1e30 - transferAmount, 'contract balance is incorrect');
      assert.strictEqual(recipientBalance, transferAmount, 'recipient balance is incorrect');
    });

    it('should emit the NewDonation event', async () => {
      const res = await donationRegistry.makeDonation(recipient, daiMock.address, transferAmount);

      assert.strictEqual(res.logs[0].event, 'NewDonation', 'Event not emitted');
    });
  });
});

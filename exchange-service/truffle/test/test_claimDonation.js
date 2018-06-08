const MiniDonationRegistry = artifacts.require('./MiniDonationRegistry.sol');
const DaiMock = artifacts.require('./DaiMock.sol');

let daiMock;
let donationRegistry;
let recipient;
const transferAmount = 1e10;

contract('MiniDonationRegistry.claimDonation()', (accounts) => {
  beforeEach(async () => {
    daiMock = await DaiMock.new();
    donationRegistry = await MiniDonationRegistry.new();
    await daiMock.mint(donationRegistry.address, 1e30);

    ([_, recipient] = accounts);
    await donationRegistry.makeDonation(recipient, daiMock.address, transferAmount);

    // First approve the registry to move the tokens then claim them.
    await daiMock.approve(donationRegistry.address, transferAmount, { from: recipient });
  });

  describe('Sending a valid redemption transaction', () => {
    it('should transfer tokens from the registry to the to address', async () => {
      await donationRegistry.claimDonation(recipient, daiMock.address, transferAmount);
      const contractBalance = (await daiMock.balanceOf(donationRegistry.address)).toNumber();
      const recipientBalance = (await daiMock.balanceOf(recipient)).toNumber();

      assert.strictEqual(contractBalance, 1e30, 'contract balance is incorrect');
      assert.strictEqual(recipientBalance, 0, 'recipient balance is incorrect');
    });

    it('should emit the DonationClaimed event', async () => {
      const res = await donationRegistry.claimDonation(recipient, daiMock.address, transferAmount);
      assert.strictEqual(res.logs[0].event, 'DonationClaimed', 'Event not emitted');
    });
  });
});

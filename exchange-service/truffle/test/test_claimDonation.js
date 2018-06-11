const MiniDonationRegistry = artifacts.require('./MiniDonationRegistry.sol');
const DaiMock = artifacts.require('./DaiMock.sol');

let daiMock;
let donationRegistry;
let recipient;
const transferAmount = 1e10;

contract('MiniDonationRegistry.claimDonation()', (accounts) => {
  beforeEach(async () => {
    daiMock = await DaiMock.new();
    donationRegistry = await MiniDonationRegistry.new(daiMock.address);
    await daiMock.mint(donationRegistry.address, 1e30);
    await donationRegistry.setAvailableReserve();

    ([_, recipient] = accounts);
    await donationRegistry.makeDonation(recipient, transferAmount);
  });

  describe('Sending a valid redemption transaction', () => {
    it('should reduce the from balance', async () => {
      await donationRegistry.claimDonation(recipient, transferAmount);
      const recipientBalance = (await donationRegistry.balanceOf(recipient)).toNumber();
      assert.strictEqual(recipientBalance, 0, 'recipient balance is incorrect');
    });

    it('should increase the availableReserve', async () => {
      await donationRegistry.claimDonation(recipient, transferAmount);
      const availableReserve = (await donationRegistry.availableReserve_()).toNumber();
      assert.strictEqual(availableReserve, 1e30, 'availableReserve is incorrect');
    });

    it('should reduce the lockedReserve', async () => {
      await donationRegistry.claimDonation(recipient, transferAmount);
      const lockedReserve = (await donationRegistry.lockedReserve_()).toNumber();
      assert.strictEqual(lockedReserve, 0, 'lockedReserve is incorrect');
    });

    it('should emit the DonationClaimed event', async () => {
      const res = await donationRegistry.claimDonation(recipient, transferAmount);
      assert.strictEqual(res.logs[0].event, 'DonationClaimed', 'Event not emitted');
    });
  });
});

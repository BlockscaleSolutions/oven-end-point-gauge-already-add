const MiniDonationRegistry = artifacts.require('./MiniDonationRegistry.sol');
const DaiMock = artifacts.require('./DaiMock.sol');
let daiMock;
let donationRegistry;

contract('MiniDonationRegistry.makeDonation()', (accounts) => {
  beforeEach(async () => {
    daiMock = await DaiMock.new();
    donationRegistry = await MiniDonationRegistry.new(daiMock.address);
    await daiMock.mint(donationRegistry.address, 1e30);
    await donationRegistry.setAvailableReserve();
  });

  describe('Sending a valid donation transaction', () => {
    const [_, recipient] = accounts;
    const transferAmount = 1e10;

    it('should allocate tokens from the registry to the to address', async () => {
      await donationRegistry.makeDonation(recipient, transferAmount);
      const recipientBalance = (await donationRegistry.balanceOf(recipient)).toNumber();
      assert.strictEqual(recipientBalance, transferAmount, 'recipient balance is incorrect');
    });

    it('should remain the registries balance', async () => {
      await donationRegistry.makeDonation(recipient, transferAmount);
      const contractBalance = (await daiMock.balanceOf(donationRegistry.address)).toNumber();
      assert.strictEqual(contractBalance, 1e30, 'contract balance is incorrect');
    });

    it('should reduce available reserve', async () => {
      await donationRegistry.makeDonation(recipient, transferAmount);
      const availableReserve = (await donationRegistry.availableReserve_()).toNumber();
      assert.strictEqual(availableReserve, 1e30 - transferAmount, 'availableReserve is incorrect');
    });

    it('should increase lockedReserve', async () => {
      await donationRegistry.makeDonation(recipient, transferAmount);
      const lockedReserve = (await donationRegistry.lockedReserve_()).toNumber();
      assert.strictEqual(lockedReserve, transferAmount, 'lockedReserve balance is incorrect');
    });

    it('should emit the NewDonation event', async () => {
      const res = await donationRegistry.makeDonation(recipient, transferAmount);
      assert.strictEqual(res.logs[0].event, 'NewDonation', 'Event not emitted');
    });
  });
});

const argv = require('../src/argv');
const { assert } = require('chai');
const app = require('../src/server');
const { sendRequest } = require('../src/utils');
const { initContracts } = require('../src/web3');

const apiUrl = argv['api-url'];
const serverPort = argv['serverPort'];
const donor = 'adamjlemmon@gmail.com';

let donation;
let res;
let server;
let token;

describe('/claimDonation POST', () => {
  before(async () => {
    server = app.listen(serverPort, () => {});

    ({ donationRegistry, token } = await initContracts());

    donation = {
      to: '0x1',
      amount: 100,
      donor
    };

    claim = {
      from: '0x1',
      amount: 100,
    }

    await sendRequest(apiUrl, 'makeDonation', 'POST', donation);
    res = await sendRequest(apiUrl, 'claimDonation', 'POST', claim);
  });

  after(() => {
    server.close();
  });

  describe('making a claim with valid parameters', () => {
    it('should return a 201', async () => {
      const { statusCode } = res;
      assert.strictEqual(statusCode, 201, 'statusCode incorrect');
    });

    it('should return the txHash', async () => {
      const { txHash } = res.body;
      assert.strictEqual(txHash.length, 66, 'txHash is not valid');
    });

    it('should update the from addresses balance', async () => {
      const balance = (await donationRegistry.balanceOf(donation.to)).toNumber();
      assert.strictEqual(balance, 0, 'from balance is not correct');
    });

    it('should return the correct donor to notify', async () => {
      const { donors } = res.body;
      assert.strictEqual(donors.length, 1, 'number of donors not correct');
      assert.strictEqual(donors[0], donation.donor, 'number of donors not correct');
    });
  });

  describe('making a claim that clears multiple donors', () => {
    it('should return the correct donor to notify', async () => {
      // 3x100 donations
      await sendRequest(apiUrl, 'makeDonation', 'POST', donation);
      await sendRequest(apiUrl, 'makeDonation', 'POST', donation);
      await sendRequest(apiUrl, 'makeDonation', 'POST', donation);

      const multiDonorClaim = {
        from: claim.from,
        amount: claim.amount * 3
      };

      const res = await sendRequest(apiUrl, 'claimDonation', 'POST', multiDonorClaim);

      const { donors } = res.body;

      assert.strictEqual(donors.length, 3, 'number of donors not correct');
      assert.strictEqual(donors[0], donation.donor, 'number of donors not correct');
    });
  });
});

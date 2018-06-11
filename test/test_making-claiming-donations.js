const argv = require('../exchange-service/src/argv');
const { assert } = require('chai');
const { sendRequest, sleep } = require('../exchange-service/src/utils');

const apiUrl = argv['api-url'];
const serverPort = argv['serverPort'];
const donor = 'adamjlemmon@gmail.com';

const donation = {
  to: '0x1',
  amount: 100,
  donor
};

describe('making a claim that clears multiple donors', () => {
  it('should return the correct donors to be notified notify', async () => {
    // 3x100 donations
    await sendRequest(apiUrl, 'makeDonation', 'POST', donation);
    await sendRequest(apiUrl, 'makeDonation', 'POST', donation);
    await sendRequest(apiUrl, 'makeDonation', 'POST', donation);

    const multiDonorClaim = {
      from: '0x1',
      amount: donation.amount * 3
    };

    const res = await sendRequest(apiUrl, 'claimDonation', 'POST', multiDonorClaim);

    const { donors } = res.body;

    assert.strictEqual(donors.length, 3, 'number of donors not correct');
    assert.strictEqual(donors[0], donation.donor, 'number of donors not correct');
  });
});

const argv = require('../src/argv');
const { assert } = require('chai');
const app = require('../src/server');
const { sendRequest } = require('../src/utils');
const { initContracts } = require('../src/web3');

const apiUrl = argv['api-url'];
const serverPort = argv['serverPort'];

const donor = 'adamjlemmon@gmail.com';

let donation;
let server;
let res;

describe('/makeDonation POST', () => {
  before(async () => {
    server = app.listen(serverPort, () => {});

    ({ donationRegistry } = await initContracts());

    donation = {
      to: '0x2',
      amount: 100,
      donor
    };

    await sendRequest(apiUrl, 'makeDonation', 'POST', donation);
    res = await sendRequest(apiUrl, `getBalance/${donation.to}`);
  });

  after(() => {
    server.close();
  });

  describe('getting a balance after a succesful donation', () => {
    it('should return a 200', async () => {
      const { statusCode } = res;
      assert.strictEqual(statusCode, 200, 'statusCode incorrect');
    });

    it('should return the balance', async () => {
      const { balance } = res.body;
      assert.strictEqual(balance, donation.amount, 'balance is not correct');
    });
  });
});

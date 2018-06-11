const argv = require('../src/argv');
const { assert } = require('chai');
const app = require('../src/server');
const { sendRequest } = require('../src/utils');
const { initContracts } = require('../src/web3');

const apiUrl = argv['api-url'];
const serverPort = argv['serverPort'];

const donor = 'adamjlemmon@gmail.com';

let server;
let token;
let donation;
let res;

describe('/makeDonation POST', () => {
  before(async () => {
    server = app.listen(serverPort, () => {});

    ({ donationRegistry, token } = await initContracts());

    donation = {
      to: '0x1',
      amount: 100,
      donor
    };

    res = await sendRequest(apiUrl, 'makeDonation', 'POST', donation);
  });

  after(() => {
    server.close();
  });

  describe('maing a donation with valid parameters', () => {
    it('should return a 201', async () => {
      const { statusCode } = res;
      assert.strictEqual(statusCode, 201, 'statusCode incorrect');
    });

    it('should return the txHash', async () => {
      const { txHash } = res.body;
      assert.strictEqual(txHash.length, 66, 'txHash is not valid');
    });

    it('should update the to addresses balance', async () => {
      const balance = (await donationRegistry.balanceOf(donation.to)).toNumber();
      assert.strictEqual(balance, donation.amount, 'to balance is not correct');
    });
  });
});

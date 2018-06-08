const argv = require('../src/argv');
const { assert } = require('chai');
const app = require('../src/server');
const { sendRequest } = require('../src/utils');
const { initContracts } = require('../src/web3');

const apiUrl = argv['api-url'];
const serverPort = argv['serverPort'];

let server;
let token;
let donation;
let res;

describe('/makeDonation POST', () => {
  before(async () => {
    server = app.listen(serverPort, () => {});

    ({ token } = await initContracts());

    donation = {
      to: '0x1',
      token: token.address,
      amount: 100,
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
      const balance = (await token.balanceOf(donation.to)).toNumber();
      assert.strictEqual(balance, donation.amount, 'to balance is not correct');
    });

    it('should return the correct queue', async () => {
      const { queue } = res.body;
      assert.strictEqual(queue[0], 1, 'queue start is not correct');
      assert.strictEqual(queue[1], donation.amount, 'queue end is not correct');
    });
  });
});

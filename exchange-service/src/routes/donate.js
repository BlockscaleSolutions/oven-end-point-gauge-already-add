const argv = require('../argv');
const errors = require('restify-errors');
const log = require('../logger');
const { Router } = require('restify-router');

const { admin, initContracts, estimateGas, web3, standardTokenArtifacts } = require('../web3');
const gasBuffer = argv['gas-buffer'];
const router = new Router();

let donationRegistry;

initContracts().then(contracts => {
  donationRegistry = contracts.donationRegistry;
});

/**
 * @param {Address} to
 * @param {Address} token
 * @param {Number} amount
 */
async function makeDonation(req, res, next) {
  try {
    const { to, token, amount } = req.body;

    const gas = await estimateGas(donationRegistry, 'makeDonation', req.body);

    log.info({ module: 'eth' }, `Gas estimation for transaction is ${gas}`);

    // Get current recipient balance to define where this donation sits in the queue to be spent
    const tokenContract = await web3.eth.contract(standardTokenArtifacts.abi).at(token);
    const balance = (await tokenContract.balanceOf(to)).toNumber();

    const txHash = await donationRegistry.makeDonation(
      ...Object.values(req.body),
      {
        from: admin,
        gas: gas + gasBuffer,
      },
    );

    const response = {
      txHash,
      queue: [balance + 1, balance + amount] // tokens added by this donation
    };

    res.send(201, response);
    return next();
  } catch (err) {
    return next(err);
  }
}

// ROUTES
router.post({ path: '/makeDonation', version: '1.0.0' }, makeDonation);

module.exports = router;

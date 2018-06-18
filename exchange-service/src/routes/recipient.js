const errors = require('restify-errors');
const log = require('../logger');
const { Router } = require('restify-router');
const { initContracts } = require('../web3');

const router = new Router();

let donationRegistry;

initContracts().then(contracts => {
  donationRegistry = contracts.donationRegistry;
});

/**
 * @param {Address} recipient
 * @returns {Number} Recipient's donation balance within the registry.
 */
async function getBalance(req, res, next) {
  try {
    const { recipient } = req.params;

    const balance = (await donationRegistry.donationBalances_(recipient)).toNumber();

    res.send(200, { balance });
    return next();
  } catch (err) {
    return next(err);
  }
}

// ROUTES
router.get({ path: '/getBalance/:recipient', version: '1.0.0' }, getBalance);

module.exports = router;

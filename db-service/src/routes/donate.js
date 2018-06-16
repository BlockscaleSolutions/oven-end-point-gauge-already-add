const errors = require('restify-errors');
const log = require('../logger');
const { Router } = require('restify-router');

const router = new Router();

/**
 * Eth donated via transaction from browser.  This service will save the transaction
 * in the db in order to define exactly when this donor's donation has been spent.
 * @param {String} txHash Hash of the transaction that donated the eth.
 */
async function donateEth(req, res, next) {
  try {
    // Transaction was sent direct from the app via metamask
    // Wait for the transaction to be included
    // Read quantity donated and address donated to from event log

    // Purchase the correct amount of dai

    // Allocate dai to the correct

    res.send('pong');
    return next();
  } catch (err) {
    return next(err);
  }
}

// ROUTES
router.post({ path: '/donate/eth', version: '1.0.0' }, donateEth);

module.exports = router;

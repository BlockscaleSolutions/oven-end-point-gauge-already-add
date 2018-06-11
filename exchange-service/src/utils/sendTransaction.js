const argv = require('../argv');
const { estimateGas } = require('../web3');
const log = require('../logger');

const gasBuffer = argv['gas-buffer'];

/**
 * Send transaction to contract
 * @param {Object} contract Deployed contract reference.
 * @param {String} method Method of the contract to call.
 * @param {Address} from Address to send the tx from.
 * @param {Object} params Input params to the above method.
 * @returns {String} Transaction hash.
 */
async function sendTransaction(contract, method, from, params) {
  const gas = await estimateGas(contract, method, params);

  log.info({ module: 'eth' }, `Gas estimation for transaction is ${gas}`);

  const txHash = await contract[method](
    ...Object.values(params),
    {
      from,
      gas: gas + gasBuffer,
    },
  );

  return txHash;
}

module.exports = sendTransaction;

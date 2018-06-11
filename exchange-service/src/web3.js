//
// Init the web3 object and required contracts
//
const argv = require('./argv');
const Web3 = require('web3');
const donationRegistryArtifacts = require('../truffle/build/contracts/MiniDonationRegistry.json');
const tokenArtifacts = require('../truffle/build/contracts/DaiMock.json');
const standardTokenArtifacts = require('../truffle/build/contracts/StandardToken.json');

const { DONATION_REGISTRY_ADDRESS, TOKEN_ADDRESS } = process.env;

const RPC_PORT = argv['eth-node-port'];
const RPC_URL = argv['eth-node-url'];

// Init the web3 connection
const web3 = new Web3(new Web3.providers.HttpProvider(`${RPC_URL || 'http://localhost'}:${RPC_PORT || 8545}`));

/**
 * Sync creation of references to the deployed contracts.
 * Promise required as web3 does not currently support await / async pattern.
 * @return {Object} reference objects to the deployed contracts
 */
function initContracts() {
  // Pull new addresses if recently deployed and not set in env
  return new Promise((resolve, reject) => {
    if (!DONATION_REGISTRY_ADDRESS) {
      web3.version.getNetwork(async (err, netId) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            donationRegistry: web3.eth.contract(donationRegistryArtifacts.abi).at(donationRegistryArtifacts.networks[netId].address),
            token: web3.eth.contract(tokenArtifacts.abi).at(tokenArtifacts.networks[netId].address),
          });
        }
      });
    } else {
      resolve({
        donationRegistry: web3.eth.contract(donationRegistryArtifacts.abi).at(DONATION_REGISTRY_ADDRESS),
        token: web3.eth.contract(donationRegistryArtifacts.abi).at(TOKEN_ADDRESS),
      });
    }
  });
}

/**
 * Estimate the gas for a given tx
 * @param {Object} contract Contract reference object.
 * @param {Object} params Input params.
 * @returns gas estimate
 */
async function estimateGas(contract, method, params) {
  const gas = await web3.eth.estimateGas({
    to: contract.address,
    data: contract[method].getData(...Object.values(params)),
  });

  return gas;
}

// Default account to use for admin transactions
const admin = web3.eth.accounts[0];

module.exports = {
  admin,
  estimateGas,
  standardTokenArtifacts,
  initContracts,
  web3,
}

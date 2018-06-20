/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
      gas: 6.7e6,
	    gasPrice: 1e9
    },
    rinkeby: {
      host: '52.168.105.41',
      port: 9876,  // NOT default 8545 as account will be unlocked
      network_id: '*', // Consider changing to hosted eth service?
      gas: 6.7e6,
      gasPrice: 1e9
    },
  }
};

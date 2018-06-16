const argv = require('yargs')
  .option('eth-node-url', { description: 'Location of the Ethereum node to connect to', default: 'http://localhost', type: 'string' })
  .option('eth-node-port', { description: 'Exposed port of the Ethereum node to connect to', default: 8545, type: 'number' })
  .option('api-url', { description: 'Location of the api to connect to', default: 'http://localhost:3001', type: 'string' })
  .option('gas-buffer', { description: 'Gas to add on top of web3 estimate', default: 1e5, type: 'number' })
  .option('threads', { description: 'Number of service threads to create', default: 1, type: 'number' })
  .option('server-port', { description: 'Port the server will run on', default: 3001, type: 'number' })
  .option('test-dir', { description: 'Test directory to execute', default: 'units', type: 'string' })
  .help('help')
  .argv

module.exports = argv

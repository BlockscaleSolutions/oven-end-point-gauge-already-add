const { sendRequest } = require('../exchange-service/src/utils');

let { apiUrl, recipient } = process.env;
apiUrl = apiUrl || 'http://localhost:3001';
recipient = recipient || '0x1';

getBalance();

async function getBalance() {
  console.log(await sendRequest(apiUrl, `getBalance/${recipient}`));
}

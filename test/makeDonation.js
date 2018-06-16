const { sendRequest, sleep } = require('../exchange-service/src/utils');

let { apiUrl, to, donor, amount } = process.env;
apiUrl = apiUrl || 'http://localhost:3001';
to = to || '0x1';
donor = donor || 'adamjlemmon@gmail.com';
amount = amount || 100;

const donation = { to, donor, amount };

makeDonation();

async function makeDonation() {
  console.log(await sendRequest(apiUrl, 'makeDonation', 'POST', donation));
}

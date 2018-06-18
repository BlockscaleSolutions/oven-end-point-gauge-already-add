const { sendRequest, sleep } = require("../exchange-service/src/utils");

let { apiUrl, to, from, amount } = process.env;
apiUrl = apiUrl || "http://localhost:3001";
to = to || 0;
from = from || "0x1";
amount = amount || 100;

const claim = { to, from, amount };

claimDonation();

async function claimDonation() {
    console.log(await sendRequest(apiUrl, "claimDonation", "POST", claim));
}

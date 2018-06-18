const errors = require("restify-errors");
const log = require("../logger");
const { Router } = require("restify-router");
const { admin, initContracts } = require("../web3");
const { sendTransaction, sendEmailNotifications } = require("../utils");

const router = new Router();

let donationRegistry;
let token;

// Object to hold to donations waiting to be spent
// recipient: {
//    spent: total
//    donorQueue: {
//        100: donor,  // the final index you will be notified at
//        150: donor
//    }
// }
/**
 * TODO we should likely how this is some db or persistent storage
 */
let donations = {};

initContracts().then(contracts => {
    donationRegistry = contracts.donationRegistry;
    token = contracts.token;
});

/**
 * @param {Address} to
 * @param {Address} from
 * @param {Number} amount
 */
async function claimDonation(req, res, next) {
    try {
        const { to, from, amount } = req.body;

        const txHash = await sendTransaction(
            donationRegistry,
            "claimDonation",
            admin,
            req.body
        );

        const donation = Object.assign(donations[from]);
        const donationStartingIndex = donation.spent;
        const donationClosingIndex = donation.spent + amount;
        let donors = [];

        const keys = Object.keys(donation["donorQueue"]).sort();

        // find the donors to notify
        for (let i = 0, len = keys.length; i < len; i += 1) {
            donors.push(donation["donorQueue"][keys[i]]);
            // Still spending first donor's donation
            if (donationClosingIndex < Number(keys[i])) {
                break;
                // Spent exactly all of first donation
            } else if (donationClosingIndex === Number(keys[i])) {
                delete donation["donorQueue"][keys[i]];
                break;
                // Spending multiple donations
            } else {
                delete donation["donorQueue"][keys[i]];
            }
        }

        donation.spent += amount;
        donation.balance -= amount;

        // Set the donation to the updated object
        donations[from] = donation;

        await sendEmailNotifications(donors); // Notify donors and others involved
        res.send(201, { txHash, donors });
        return next();
    } catch (err) {
        return next(err);
    }
}

/**
 * @param {Address} to
 * @param {Number} amount
 * @param {String} donor Contact details for the donor if they wish to be notified, email for now.
 */
async function makeDonation(req, res, next) {
    try {
        const { to, amount, donor } = req.body;

        const txHash = await sendTransaction(
            donationRegistry,
            "makeDonation",
            admin,
            { to, amount }
        );

        // Get current recipient balance to define where this donation sits in the queue to be spent
        const balance = (await token.balanceOf(to)).toNumber();

        if (!(to in donations)) {
            donations[to] = {
                balance: 0,
                spent: 0,
                donorQueue: {}
            };
        }

        const donation = donations[to];
        const notificationIndex = donation.spent + amount + donation.balance;
        donation.balance += amount;

        // Add this donation to the local list to be spent
        donations[to]["donorQueue"][notificationIndex] = donor;

        res.send(201, { txHash });
        return next();
    } catch (err) {
        return next(err);
    }
}

// ROUTES
router.post({ path: "/makeDonation", version: "1.0.0" }, makeDonation);
router.post({ path: "/claimDonation", version: "1.0.0" }, claimDonation);

module.exports = router;

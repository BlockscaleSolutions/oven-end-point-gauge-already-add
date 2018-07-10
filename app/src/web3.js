import Web3 from "web3";

import DebtArtifacts from "./truffle/build/contracts/Debt.json";
import { Connect, SimpleSigner, MNID } from "uport-connect";

window.pendingTxs = [];

export function connect(userType) {
  window.userType = userType;

  return new Promise(async (resolve, reject) => {
    const uport = new Connect("USAID Demo", {
        clientId: "2ogrEddet3JBno1oXQZtJwFdWZHBmkyKh9X",
        network: "rinkeby",
        signer: SimpleSigner(
            "3bd60e956ceb731e606be7a5ca5e54a3b741fe0ff43fccc174e7da145ac08450"
        )
    });

    // Request credentials to login
    uport
        .requestCredentials({
            requested: ["name", "phone", "country"],
            notifications: true // We want this if we want to recieve credentials
        })
        .then(async credentials => {
            window.user = credentials;

            const decodedId = MNID.decode(credentials.address);
            const specificNetworkAddress = decodedId.address;
            window.loggedInAddress = specificNetworkAddress;

            window.uportWeb3 = uport.getWeb3();

            await initContract();

            resolve();
        });
  });
}

export async function initContract() {
    // RINKEBY
    const address = "0x8c7bbeed980f9ebf0fd762864fdb26cb8dd0bcf5";
    window.sendTxsDebt = await window.uportWeb3.eth
        .contract(DebtArtifacts.abi)
        .at(address);

    await initListeners();

    const filter = window.userType == "borrower" ? { borrower: window.loggedInAddress } : { lender: window.loggedInAddress };
    const events = [ 'LoanCreated', 'LoanReceived', 'LoanPaid' ];

    for (let i = 0; i < events.length; i += 1) {
      await getEventLogs(events[i], filter);
    }
}

export function getEventLogs(_event, filter, fromBlock=2492715, toBlock="latest") {
    return new Promise(async (resolve, reject) => {
      window.getLogsDebt[_event](filter, { fromBlock, toBlock }).get(
         (e, r) => {
             window[_event] = r.reverse();
             resolve();
         }
     );
    });
}

export function createLoan() {
    window.sendTxsDebt.createLoanRequest(
        100,
        window.borrower,
        window.lender,
        (err, txHash) => {
            console.log(err);
            console.log(txHash);
        }
    );
}

export function loanReceived() {
    window.sendTxsDebt.loanReceived((err, txHash) => {
        console.log(err);
        console.log(txHash);
        if (txHash) window.open(`http://rinkeby.etherscan.io/tx/${txHash}`);
    });
}

export function loanPaid(borrower) {
    window.sendTxsDebt.loanPaid(borrower, (err, txHash) => {
        console.log(err);
        console.log(txHash);
        if (txHash) window.open(`http://rinkeby.etherscan.io/tx/${txHash}`);
    });
}

async function initListeners() {
    const web3 = new Web3(
        new Web3.providers.HttpProvider("http://localhost:8545")
    );
    const address = "0x8c7bbeed980f9ebf0fd762864fdb26cb8dd0bcf5";
    const debt = await web3.eth.contract(DebtArtifacts.abi).at(address);

    // Use our own node to listen for event
    window.localWeb3 = web3;
    window.getLogsDebt = debt;

    debt.allEvents({ fromBlock: "latest", toBlock: "latest" }).watch(
        (err, res) => {
            // Only show relevant events for the logged in user
            if (
              res.args.borrower && (res.args.borrower == window.loggedInAddress) ||
              res.args.lender && (res.args.lender == window.loggedInAddress)
            ) {
              alert(`New event caught: ${res.event} ${JSON.stringify(res.args)}`);

              // Parse from pending txs and append to the correct able
              // window.pendingTxs.splice(0);
              // console.log(window.pendingTxs);
            }
        }
    );
}

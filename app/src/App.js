import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import withLayout from "./_hocs/withLayout";
import withAuthorization from "./_hocs/withAuthorization";

import Authentication from "./views/Authentication";
import Front from "./views/Front";
import Loan from "./views/Loan";
import Marketplace from "./views/Marketplace";
import NoMatch from "./views/NoMatch";
import Borrower from "./views/Users/Borrower/Dashboard";
import Lender from "./views/Users/Lender/Dashboard";

import "./style-reset.css";
import "./style-layout.css";

/**********************************
ETHER STUFF
**********************************/
import Web3 from "web3";

import DebtArtifacts from "./truffle/build/contracts/Debt.json";
import { Connect, SimpleSigner, MNID } from 'uport-connect'

window.borrower = "0x33785c20deec47951d756d78c2cd71859af15f78";
window.lender = "0xd969928b995b5d30c17575459703592d8fde9f63";

const uport = new Connect('USAID Demo', {
  clientId: '2ogrEddet3JBno1oXQZtJwFdWZHBmkyKh9X',
  network: 'rinkeby',
  signer: SimpleSigner('3bd60e956ceb731e606be7a5ca5e54a3b741fe0ff43fccc174e7da145ac08450')
})

window.uportWeb3 = uport.getWeb3();

// Request credentials to login
uport.requestCredentials({
  requested: ['name', 'phone', 'country'],
  notifications: true // We want this if we want to recieve credentials
})
.then((credentials) => {
  window.user = credentials;

  const decodedId = MNID.decode(credentials.address)
  const specificNetworkAddress = decodedId.address
  window.loggedInAddress = specificNetworkAddress;

  initContract();
});

async function initContract() {
  // RINKEBY
  const address = '0x8c7bbeed980f9ebf0fd762864fdb26cb8dd0bcf5';
  window.sendTxsDebt = await window.uportWeb3.eth.contract(DebtArtifacts.abi).at(address);

  initListeners();

  // createLoan();

  // Cash received!
  if (window.loggedInAddress === window.borrower) {
    // loanReceived();
  } else {
    // loanPaid();
  }
}

function createLoan () {
  window.sendTxsDebt.createLoanRequest(100, window.borrower, window.lender,
  (err, txHash) => {
    console.log(err)
    console.log(txHash)
  });
}

function loanReceived () {
  window.sendTxsDebt.loadReceived(
  (err, txHash) => {
    console.log(err)
    console.log(txHash)
  });
}

function loanPaid () {
  window.sendTxsDebt.loadPaid(window.borrower,
  (err, txHash) => {
    console.log(err)
    console.log(txHash)
  });
}

async function initListeners() {
  // Use our own node to listen for event
  const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  const address = '0x8c7bbeed980f9ebf0fd762864fdb26cb8dd0bcf5';
  const debt = await web3.eth.contract(DebtArtifacts.abi).at(address);

  window.localWeb3 = web3;
  window.getLogsDebt = debt;

  debt.allEvents({ fromBlock: 'latest', toBlock: 'latest' }).watch((err, res) => {
    console.log(err)
    console.log(res.event)
    console.log(res.args)
  });
}
// *****************************************

const Ooopps = () => (
    <div className="fit layout vertical center-center">
        Ooopps you have wandered off
    </div>
);

export default class App extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/sign-in" component={Authentication} />
                <Route exact path="/404" component={NoMatch} />

                <Route exact path="/" component={Front} />

                <Route
                    exact
                    path="/marketplace"
                    component={withLayout(
                        withAuthorization("*")(Marketplace, Ooopps)
                    )}
                />

                <Route
                    exact
                    path="/loans/:id?"
                    component={withLayout(withAuthorization("*")(Loan, Ooopps))}
                />

                <Route
                    exact
                    path="/profile/:user_id"
                    component={withLayout(
                        withAuthorization("*")(Borrower, Ooopps)
                    )}
                />

                <Route
                    exact
                    path="/lenders"
                    component={withLayout(
                        withAuthorization("*")(Lender, Ooopps)
                    )}
                />

                <Redirect to="/404" />
            </Switch>
        );
    }
}

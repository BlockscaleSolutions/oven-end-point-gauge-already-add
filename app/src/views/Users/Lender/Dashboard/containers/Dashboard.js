import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../../../../_actions/loans";
import Dashboard from "../components/Dashboard";
import Web3 from "web3";

import DebtArtifacts from "../truffle/build/contracts/Debt.json";
// import DebtArtifacts from "./Debt.json";
import { Connect, SimpleSigner } from 'uport-connect'

// const web3 = new Web3(new Web3.providers.HttpProvider("http://52.168.105.41:9876"));
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const [admin, borrower, lender] = web3.eth.accounts;
let debt;

window.web3 = web3;

// const uport = new Connect('Adam Lemmon\'s new app', {
//   clientId: '2ogrEddet3JBno1oXQZtJwFdWZHBmkyKh9X',
//   network: 'rinkeby',
//   signer: SimpleSigner('3bd60e956ceb731e606be7a5ca5e54a3b741fe0ff43fccc174e7da145ac08450')
// })

initContract();

async function initContract() {
  web3.version.getNetwork(async (err, netId) => {
    const address = DebtArtifacts.networks[netId].address;
    // const address = '0xea51852a8fbc0b03cbe9f5ef1e52f8e562e01417';
    debt = await web3.eth.contract(DebtArtifacts.abi).at(address);

    window.debt = debt;

    initListeners(debt);

    console.log(await debt.createLoanRequest.call(100, borrower, lender, { from: admin, gas: 4e6 }));
    console.log(await debt.createLoanRequest(100, borrower, lender, { from: admin, gas: 4e6 }));
    console.log(await debt.loanReceived({ from: borrower, gas: 4e6 }));
    console.log(await debt.loanPaid(borrower, { from: lender, gas: 4e6 }));

    getPastLoans(debt, 'LoanCreated', { borrower });
    getPastLoans(debt, 'LoanReceived', { borrower });
    getPastLoans(debt, 'LoanPaid', { borrower });
    getPastLoans(debt, 'LoanCreated', { lender });
    getPastLoans(debt, 'LoanReceived', { lender });
    getPastLoans(debt, 'LoanPaid', { lender });
  });
}


function initListeners(contract) {
  contract.allEvents({ fromBlock: 'latest', toBlock: 'latest' }).watch((err, res) => {
    console.log(err)
    console.log(res.event)
    console.log(res.args)
  });
}


function getPastLoans(contract, query) {
  contract.LoanCreated(query, { fromBlock: 0, toBlock: 'latest' }).get((err, res) => {
    console.log(err)
    console.log(res)
    console.log(res.length)
  });
}

const mapStateToProps = state => ({
    open: state.Loans.loans,
    history: state.Loans.loans
});

const mapDispatchToProps = dispatch => ({
    fetchByUserId: user_id => {
        return dispatch(actions.fetchByUserId(user_id));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Dashboard)
);

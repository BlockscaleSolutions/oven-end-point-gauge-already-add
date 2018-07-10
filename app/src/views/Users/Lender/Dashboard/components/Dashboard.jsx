import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ObligationTable from "./ObligationTable";
import PendingTxsTable from "./PendingTxsTable";

import "./Dashboard.css";

import { connect, loanPaid } from "../../../../../web3";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loansCreated: null,
            loansReceived: null,
            loansPaid: null,
            pendingTxs: [],
        };
    }

    async componentDidMount() {
      if (!window.loggedInAddress) {
        await connect('lender');

        window.pendingTxs.push(['Amount: 100, Borrower: Adam Lemmon']);

        if (window.pendingTxs.length) {
          this.setState(prevState => ({
            pendingTxs: [...prevState.pendingTxs, window.pendingTxs]
          }))
        }
      }

      this.setState({ loansCreated: window.LoanCreated });
      this.setState({ loansReceived: window.LoanReceived });
      this.setState({ loansPaid: window.LoanPaid });
    }

    async handleSubmit(event) {
      event.preventDefault();

      let amount = 100;
      let Lender_id = window.loggedInAddress;
      let Borrower_id = Lender_id; // HARDCODE Adam Lemmon

      let history = this.props.history;

      window.sendTxsDebt.createLoanRequest(
          amount,
          Borrower_id,
          Lender_id,
          { from: Lender_id },
        (err, txHash) => {
          console.error(err);
          console.log(txHash)
          if (txHash) window.open(`https://rinkeby.etherscan.io/tx/${txHash}`);
        }
      );

      alert("Transaction sent, waiting for block inclusion...");

      history.push(`/lenders/`);
    }

    claimLoanPaid() {
      loanPaid(window.loggedInAddress);
      alert('Transaction sent, waiting for block inclusion...');
    }

    render() {
        return (
            <section className="--Dashboard" style={{ padding: 50 }}>
                <header />
                <h1>Paid Debt Obligations: {this.state.loansPaid ? this.state.loansPaid.length : 0}</h1>
                <h1>Opened Debt Obligations: {this.state.loansCreated ? this.state.loansCreated.length : 0}</h1>
                <h1>Received Debt Obligations: {this.state.loansReceived ? this.state.loansReceived.length : 0}</h1>

                <article style={{"marginTop": 100}}>
                    <h3>Completed Debt Obligations</h3>
                    {
                      (this.state.loansPaid ? <ObligationTable data={this.state.loansPaid}/> : "")
                    }
                </article>

                <article style={{"marginTop": 100}}>
                    <h3>Received Debt Obligations</h3>
                    <Button onClick={() => this.claimLoanPaid()}>CLAIM LOAN REPAID</Button>
                    {
                      (this.state.loansReceived ? <ObligationTable data={this.state.loansReceived}/> : "")
                    }
                </article>

                <article style={{"marginTop": 100}}>
                    <h3>Open Debt Obligations</h3>
                    {
                      (this.state.loansCreated ? <ObligationTable data={this.state.loansCreated}/> : "")
                    }
                </article>

                {
                  this.state.pendingTxs.length
                  ?
                  <article style={{"marginTop": 100}}>
                      <h3>Pending Transactions</h3>
                      {
                        <PendingTxsTable data={this.state.pendingTxs}/>
                      }
                  <Button onClick={this.handleSubmit.bind(this)}>
                    APPROVE
                  </Button>
                  </article>
                  : ""
                }
            </section>
        );
    }
}

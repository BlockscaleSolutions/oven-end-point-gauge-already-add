import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ObligationTable from "./ObligationTable";
import PendingTxsTable from "./PendingTxsTable";

import "./Dashboard.css";

import { connect, loanReceived } from "../../../../../web3";

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
        await connect('borrower');
      }

      this.setState({ loansCreated: window.LoanCreated });
      this.setState({ loansReceived: window.LoanReceived });
      this.setState({ loansPaid: window.LoanPaid });

      if (window.pendingTxs.length) {
        this.setState(prevState => ({
          pendingTxs: [...prevState.pendingTxs, window.pendingTxs]
        }))
      }
    }

    claimLoanReceived() {
      loanReceived();
      alert('Transaction sent, waiting for block inclusion...');
    }

    render() {
        return (
            <section className="--Dashboard" style={{ padding: 50 }}>
                <header />
                <div>
                    <Link to="/loans">REQUEST LOAN</Link>
                </div>

                <h1>Paid Debt Obligations: {this.state.loansPaid ? this.state.loansPaid.length : 0}</h1>
                <h1>Opened Debt Obligations: {this.state.loansCreated ? this.state.loansCreated.length : 0}</h1>
                <h1>Received Debt Obligations: {this.state.loansReceived ? this.state.loansReceived.length : 0}</h1>

                {
                  this.state.pendingTxs.length
                  ?
                  <article style={{"marginTop": 100}}>
                      <h3>Pending Transactions</h3>
                      {
                        <PendingTxsTable data={this.state.pendingTxs}/>
                      }
                  </article>
                  : ""
                }

                <article style={{"marginTop": 100}}>
                    <h3>Completed Debt Obligations</h3>
                    {
                      (this.state.loansPaid ? <ObligationTable data={this.state.loansPaid}/> : "")
                    }
                </article>

                <article style={{"marginTop": 100}}>
                    <h3>Received Debt Obligations</h3>
                    {
                      (this.state.loansReceived ? <ObligationTable data={this.state.loansReceived}/> : "")
                    }
                </article>

                <article style={{"marginTop": 100}}>
                    <h3>Open Debt Obligations</h3>
                    <Button onClick={() => this.claimLoanReceived()}>CLAIM LOAN RECEIVED</Button>
                    {
                      (this.state.loansCreated ? <ObligationTable data={this.state.loansCreated}/> : "")
                    }
                </article>
            </section>
        );
    }
}

import React from "react";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import "./_Create.css";

// Hack mapping of user names to uport addresses and emails
const users = [
  {
    name: "Erik Zvaigzne",
    email: "erik@blockscalesolutions.com",
    address: "0x33785c20deec47951d756d78c2cd71859af15f78"
  },
  { name: "Adam Lemmon",
    email: "adam@blockscalesolutions.com",
    address: "0xd969928b995b5d30c17575459703592d8fde9f63"
  },
];

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: "",
            term: "",
            interest_rate: "",
            Lender_id: "",
            tx_hash: null
        };

        this.handleChange = field => event => {
            this.setState({ [field]: event.target.value });
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        let amount = this.state.amount;
        let term = this.state.term;
        let interest_rate = this.state.interest_rate;
        let Lender_id = this.state.Lender_id;

        let history = this.props.history;

        alert("Transaction sent, waiting for approval...");
        history.push(`/borrowers/`);
        window.pendingTxs.push(`Amount: ${amount}, Lender: ${Lender_id}`);

        // this.props
        //     .create(amount, term, interest_rate, Lender_id)
        //     .then(txHash => {
        //         history.push(`/borrowers/`);
        //         window.open(`https://rinkeby.etherscan.io/tx/${txHash}`);
        //     });
    }

    render() {
        return (
            <section className="--Create layout horizontal center-center">
                <Paper>
                    <h3>Create Loan</h3>
                    <form className="">
                        <div>
                            <input
                                value={this.state.amount}
                                type="number"
                                placeholder="Amount"
                                required
                                onChange={this.handleChange("amount")}
                            />
                        </div>

                        <div>
                            <input
                                value={this.state.term}
                                type="number"
                                placeholder="Term (days)"
                                required
                                onChange={this.handleChange("term")}
                            />
                        </div>

                        <div>
                            <input
                                value={this.state.interest_rate}
                                type="number"
                                placeholder="Interest Rate"
                                required
                                onChange={this.handleChange("interest_rate")}
                            />
                        </div>

                        <div>
                          <TextField
                            select
                            label="Lender"
                            fullWidth
                            value={this.state.Lender_id}
                            required
                            onChange={this.handleChange('Lender_id')}
                          >
                            {users.map(user => (
                              <MenuItem key={user.name} value={user.address}>
                                {user.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>

                        <div className="actions layout horizontal center-center">
                            <Button onClick={this.handleSubmit.bind(this)}>
                                Create Loan
                            </Button>
                        </div>
                    </form>
                </Paper>
            </section>
        );
    }
}

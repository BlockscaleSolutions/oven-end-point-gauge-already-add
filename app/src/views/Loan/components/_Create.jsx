import React from "react";
import Button from "@material-ui/core/Button";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: "",
            term: "",
            interest_rate: "",
            Lender_id: ""
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

        this.props.create(amount, term, interest_rate, Lender_id);
    }

    render() {
        return (
            <section>
                <h3>Create Loan</h3>
                <form>
                    <div>
                        <input
                            value={this.state.amount}
                            type="text"
                            placeholder="Amount"
                            required
                            onChange={this.handleChange("amount")}
                        />
                    </div>

                    <div>
                        <input
                            value={this.state.term}
                            type="text"
                            placeholder="Term (days)"
                            required
                            onChange={this.handleChange("term")}
                        />
                    </div>

                    <div>
                        <input
                            value={this.state.interest_rate}
                            type="text"
                            placeholder="Interest Rate"
                            required
                            onChange={this.handleChange("interest_rate")}
                        />
                    </div>

                    <div>
                        <input
                            value={this.state.Lender_id}
                            type="text"
                            placeholder="Lender"
                            required
                            onChange={this.handleChange("Lender_id")}
                        />
                    </div>

                    <div>
                        <Button onClick={this.handleSubmit.bind(this)}>
                            Create Loan
                        </Button>
                    </div>
                </form>
            </section>
        );
    }
}

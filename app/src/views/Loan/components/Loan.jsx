import React from "react";
import Button from "@material-ui/core/Button";

import Create from "./_Create";

export default class extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;
        let pathname = this.props.location.pathname;
        if (/\/loans\/approve/.test(pathname)) {
        } else if (id) {
            this.props.fetchById(id);
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        let amount = 1;
        let term = null;
        let interest_rate = null;
        let Lender_id = null;

        alert("Transaction sent, waiting for approval...");

        let history = this.props.history;
        this.props
            .create(amount, term, interest_rate, Lender_id)
            .then(tx_hash => {
                this.setState({ tx_hash });
                window.open(`https://rinkeby.etherscan.io/tx/${tx_hash}`);
                //history.push(`/borrowers/${window.loggedInAddress}`);
            });
    }

    render() {
        let id = this.props.match.params.id;
        let loan = this.props.loan;

        let pathname = this.props.location.pathname;

        if (/\/loans\/approve/.test(pathname)) {
            return (
                <section>
                    <h3>loan</h3>
                    <article>
                        <div>loan id: {id}</div>
                        <div>1</div>
                    </article>
                    <article>
                        <Button onClick={this.handleSubmit.bind(this)}>
                            Approve
                        </Button>
                    </article>
                </section>
            );
        } else if (id) {
            return (
                <section>
                    <h3>loan</h3>
                    <article>
                        <div>loan id: {id}</div>
                        <div>{loan.amount}</div>
                    </article>
                    <article>
                        <button>approve</button>
                    </article>
                </section>
            );
        } else {
            return <Create {...this.props} />;
        }
    }
}

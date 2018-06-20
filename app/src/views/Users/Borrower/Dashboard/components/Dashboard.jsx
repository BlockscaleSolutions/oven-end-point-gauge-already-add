import React from "react";
import { Link } from "react-router-dom";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ list: window.logs });
        }, 10000);
        let Borrower_id = this.props.match.params.Borrower_id;
        this.props.fetchByBorrowerId(Borrower_id);
        // setTimeout()
    }

    render() {
        return (
            <section>
                <header />

                <div>
                    <Link to="/loans">REQUEST LOAN</Link>
                </div>

                <article>
                    <h3>requests</h3>
                    <ul>
                        {this.state.list.map((loan, i) => (
                            <li key={i}>{JSON.stringify(loan)}</li>
                        ))}
                    </ul>
                </article>

                <article>
                    <h3>open obligations</h3>
                    <ul>
                        {this.props.loans
                            .filter(loan => loan.is_active)
                            .map((loan, i) => (
                                <li key={i}>{JSON.stringify(loan)}</li>
                            ))}
                    </ul>
                </article>

                <article>
                    <h3>open requests</h3>
                    <ul>
                        {this.props.loans
                            .filter(loan => !loan.is_active)
                            .map((loan, i) => (
                                <li key={i}>{JSON.stringify(loan)}</li>
                            ))}
                    </ul>
                </article>

                <article>
                    <h3>history</h3>
                    <ul>
                        {this.props.loans
                            .filter(loan => !loan.is_active)
                            .map((loan, i) => (
                                <li key={i}>{JSON.stringify(loan)}</li>
                            ))}
                    </ul>
                </article>
            </section>
        );
    }
}

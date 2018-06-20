import React from "react";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleClick = id => {
            return () => {
                this.props.history.push(`/loans/${id}`);
            };
        };
    }

    componentDidMount() {
        let Lender_id = this.props.match.params.Lender_id;
        this.props.fetchByLenderId(Lender_id);
    }

    render() {
        return (
            <section>
                <header />

                <article>
                    <h3>open</h3>
                    <ul>
                        {this.props.loans
                            .filter(loan => loan.is_active)
                            .map((loan, i) => (
                                <li key={i} onClick={this.handleClick(loan.id)}>
                                    {JSON.stringify(loan)}
                                </li>
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

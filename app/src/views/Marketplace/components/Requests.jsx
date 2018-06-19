import React from "react";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchOpenRequests();
    }

    handleClick(loan) {
        return () => {
            // load loan
        };
    }

    render() {
        return (
            <section>
                <ul>
                    {this.props.loans.map((loan, i) => (
                        <li onClick={this.handleClick(loan)}>
                            {JSON.stringify(loan)}
                        </li>
                    ))}
                </ul>
            </section>
        );
    }
}

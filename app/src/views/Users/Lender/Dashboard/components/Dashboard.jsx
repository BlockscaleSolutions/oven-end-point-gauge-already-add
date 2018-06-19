import React from "react";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let user_id = this.props.match.params.user_id;
        this.props.fetchByUserId(user_id);
    }

    render() {
        return (
            <section>
                <header />

                <article>
                    <h3>open</h3>
                    <ul>
                        {this.props.open_obligations.map((loan, i) => (
                            <li key={i}>{JSON.stringify(loan)}</li>
                        ))}
                    </ul>
                </article>

                <article>
                    <h3>history</h3>
                    <ul>
                        {this.props.history.map((loan, i) => (
                            <li key={i}>{JSON.stringify(loan)}</li>
                        ))}
                    </ul>
                </article>
            </section>
        );
    }
}

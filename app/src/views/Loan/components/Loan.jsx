import React from "react";

import Create from "./_Create";

export default class extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;
        if (id) {
            // fetch
        }
    }

    render() {
        let id = this.props.match.params.id;

        if (id) {
            return (
                <section>
                    <h1>loan</h1>
                </section>
            );
        } else {
            return <Create {...this.props} />;
        }
    }
}

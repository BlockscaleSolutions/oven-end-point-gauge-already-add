import React from "react";

import style from "./Authentication.css";

export default class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };

        this.handleChange = field => event => {
            if (field === "password" && event.key === "Enter") {
                this.handleSignIn(event);
            }
            this.setState({ [field]: event.target.value });
        };
    }

    componentDidMount() {
        this.handleChange = this.handleChange.bind(this);
        if (/^sign-in/.test(this.props.location.pathname)) {
            this.props.reset();
        }
    }

    componentDidUpdate() {
        if (
            this.props.authenticated &&
            /sign-in/.test(this.props.location.pathname)
        ) {
            this.props.router.push("/");
        }
    }

    componentWillUpdate(nextProps, nextState) {
        let authenticating = this.props.authenticating;
        if (authenticating && authenticating.fetching) {
            if (
                nextProps.authenticating &&
                !nextProps.authenticating.fetching
            ) {
                this.setState({ password: "" });
            }
        }
    }

    handleSignIn(event) {
        event.preventDefault();
        let username = this.state.username.trim();
        let password = this.state.password.trim();
        if (!username || !password) {
            alert("no credentials entered");
        } else {
            this.props.authenticate({ username, password });
        }
    }

    render() {
        let authenticating = this.props.authenticating;

        return (
            <section className="fit layout vertical center-center text-not-selectable">
                <form className={style.root}>
                    <section className="view-fields">
                        <input
                            value={this.state.username}
                            type="text"
                            autoComplete="true"
                            placeholder="username // email address"
                            required
                            onChange={this.handleChange("username")}
                        />
                        <input
                            value={this.state.password}
                            type="password"
                            autoComplete="current-password"
                            placeholder="password"
                            required
                            onChange={this.handleChange("password")}
                        />
                    </section>
                    <section className="view-actions">
                        <button onClick={this.handleSignIn.bind(this)}>
                            Sign in
                        </button>
                    </section>
                </form>

                {authenticating &&
                    authenticating.fetching && <div>loading</div>}
            </section>
        );
    }
}

import React from "react";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email_address: "",
            username: "",
            password: "",
            confirm_password: ""
        };

        this.handleChange = field => event => {
            if (field === "confirm_password" && event.key === "Enter") {
                this.handleSubmit(event);
            }
            if (/\s/.test(event.target.value)) {
            } else {
                this.setState({ [field]: event.target.value });
            }
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        let email_address = this.state.email_address;
        let username = this.state.username;
        let password = this.state.password;
        let confirm_password = this.state.confirm_password;
        if (!email_address || !username || !password || !confirm_password) {
            alert("please complete the form");
        } else {
            debugger;
            this.props.register({
                email_address,
                username,
                password,
                confirm_password
            });
        }
    }

    render() {
        return (
            <div>
                <form>
                    <section>
                        <div>
                            <label>email address</label>
                            <input
                                value={this.state.email_address}
                                type="text"
                                autoComplete="true"
                                placeholder="email address"
                                required
                                onChange={this.handleChange("email_address")}
                            />
                        </div>

                        <div>
                            <label>username</label>
                            <input
                                value={this.state.username}
                                type="text"
                                placeholder="username"
                                required
                                onChange={this.handleChange("username")}
                            />
                        </div>

                        <div>
                            <label>password</label>
                            <input
                                value={this.state.password}
                                type="password"
                                placeholder="password"
                                required
                                onChange={this.handleChange("password")}
                            />
                        </div>

                        <div>
                            <label>confirm password</label>
                            <input
                                value={this.state.confirm_password}
                                type="password"
                                placeholder="confirm password"
                                required
                                onChange={this.handleChange("confirm_password")}
                            />
                        </div>
                    </section>

                    <section>
                        <button onClick={this.handleSubmit.bind(this)}>
                            submit
                        </button>
                    </section>
                </form>
            </div>
        );
    }
}

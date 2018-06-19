import React from "react";
import { Link } from "react-router-dom";

export default class extends React.Component {
    render() {
        return (
            <section>
                <div>hello!</div>
                <div>
                    <Link to="/sign-in">Sign In</Link>
                </div>
            </section>
        );
    }
}

import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import withLayout from "./_hocs/withLayout";
import withAuthorization from "./_hocs/withAuthorization";

import Authentication from "./views/Authentication";
import NoMatch from "./views/NoMatch";
import Recipient from "./views/Recipient";
import UserRegistration from "./views/UserRegistration";

const Ooopps = () => (
    <div className="fit layout vertical center-center">
        Ooopps you have wandered off
    </div>
);

const Front = () => <div>front page</div>;
const Admin = () => <div>admin page</div>;
const Home = () => <div>home page</div>;

export default class App extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/sign-in" component={Authentication} />
                <Route exact path="/404" component={NoMatch} />

                <Route exact path="/" component={Front} />

                <Route
                    exact
                    path="/user/registration"
                    component={UserRegistration}
                />

                <Route
                    exact
                    path="/admin"
                    component={withLayout(
                        withAuthorization("admin")(Admin, Ooopps)
                    )}
                />

                <Route
                    exact
                    path="/home"
                    component={withLayout(withAuthorization("*")(Home, Ooopps))}
                />

                <Route
                    exact
                    path="/recipient"
                    component={withLayout(
                        withAuthorization("recipient")(Recipient, Ooopps)
                    )}
                />

                <Redirect to="/404" />
            </Switch>
        );
    }
}

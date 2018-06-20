import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import withLayout from "./_hocs/withLayout";
import withAuthorization from "./_hocs/withAuthorization";

import Authentication from "./views/Authentication";
import Front from "./views/Front";
import Loan from "./views/Loan";
import Marketplace from "./views/Marketplace";
import NoMatch from "./views/NoMatch";
import Borrower from "./views/Users/Borrower/Dashboard";
import Lender from "./views/Users/Lender/Dashboard";

import "./style-reset.css";
import "./style-layout.css";

const Ooopps = () => (
    <div className="fit layout vertical center-center">
        Ooopps you have wandered off
    </div>
);

export default class App extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/sign-in" component={Authentication} />
                <Route exact path="/404" component={NoMatch} />

                <Route exact path="/" component={Front} />

                <Route
                    exact
                    path="/marketplace"
                    component={withLayout(
                        withAuthorization("*")(Marketplace, Ooopps)
                    )}
                />

                <Route
                    exact
                    path="/loans/:id?"
                    component={withLayout(withAuthorization("*")(Loan, Ooopps))}
                />

                <Route
                    exact
                    path="/profile/:user_id"
                    component={withLayout(
                        withAuthorization("*")(Borrower, Ooopps)
                    )}
                />

                <Route
                    exact
                    path="/lenders"
                    component={withLayout(
                        withAuthorization("*")(Lender, Ooopps)
                    )}
                />

                <Redirect to="/404" />
            </Switch>
        );
    }
}

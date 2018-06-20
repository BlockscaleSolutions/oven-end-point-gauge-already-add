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

/**********************************
ETHER STUFF
**********************************/
import Web3 from "web3";

import DebtArtifacts from "./truffle/build/contracts/Debt.json";
import { Connect, SimpleSigner, MNID } from "uport-connect";

// const web3 = new Web3(new Web3.providers.HttpProvider("http://52.168.105.41:9876"));
window.web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:8545")
);
const [admin, borrower, lender] = window.web3.eth.accounts;

const uport = new Connect("Adam Lemmon's new app", {
    clientId: "2ogrEddet3JBno1oXQZtJwFdWZHBmkyKh9X",
    network: "rinkeby",
    signer: SimpleSigner(
        "3bd60e956ceb731e606be7a5ca5e54a3b741fe0ff43fccc174e7da145ac08450"
    )
});

// Request credentials to login
uport
    .requestCredentials({
        requested: ["name", "phone", "country"],
        notifications: true // We want this if we want to recieve credentials
    })
    .then(credentials => {
        // Do something
        window.user = credentials;

        const decodedId = MNID.decode(credentials.address);
        const specificNetworkAddress = decodedId.address;

        console.log(decodedId);
        window.from = specificNetworkAddress;
        console.log(specificNetworkAddress);

        initContract();
    });

async function initContract() {
    window.web3.version.getNetwork(async (err, netId) => {
        // const address = DebtArtifacts.networks[netId].address;
        // RINKEBY
        const address = "0x8c7bbeed980f9ebf0fd762864fdb26cb8dd0bcf5";
        window.debt = await window.web3.eth
            .contract(DebtArtifacts.abi)
            .at(address);
        initListeners(window.debt);

        console.log("send send send");
        console.log("send send send");
        console.log(
            await window.debt.createLoanRequest(100, "0x1", "0x2", {
                from: window.from,
                gas: 1e6
            })
        );
    });
}

function initListeners(contract) {
    contract
        .allEvents({ fromBlock: "latest", toBlock: "latest" })
        .watch((err, res) => {
            console.log(err);
            console.log(res.event);
            console.log(res.args);
        });
}
// *****************************************

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

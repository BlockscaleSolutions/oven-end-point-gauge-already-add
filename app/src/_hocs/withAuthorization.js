import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../_actions/authenticate";

const mapStateToProps = ({ Authenticate }) => {
    return { Authenticate };
};

const mapDispatchToProps = dispatch => ({
    set: payload => dispatch(actions.set(payload))
});

export default authorized_roles => (WrappedComponent, NotAuthorized = null) => {
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(
        class extends React.Component {
            get jwt() {
                return window.localStorage.getItem("--jwt--");
            }

            get identity() {
                return this.props.Authenticate.authenticated;
            }

            get isProtected() {
                return process.env.REACT_APP_IS_PROTECTED;
            }

            get isSignedIn() {
                if (this.jwt && this.identity) {
                    let exp = this.identity.exp * 1000;
                    if (!exp || exp > Date.now()) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }

            get isAuthorized() {
                if (authorized_roles === "*") {
                    return true;
                } else {
                    let _roles = _.isArray(this.identity.roles)
                        ? this.identity.roles
                        : [this.identity.roles];

                    let _authorized_roles = _.isArray(authorized_roles)
                        ? authorized_roles
                        : [authorized_roles];

                    return _.intersection(_roles, _authorized_roles).length
                        ? true
                        : false;
                }
            }

            componentDidMount() {
                if (!this.identity) {
                    if (this.jwt) {
                        this.props.set(this.jwt);
                    }
                }
            }

            render() {
                if (
                    !this.isProtected ||
                    (this.isProtected && this.isSignedIn && this.isAuthorized)
                ) {
                    return <WrappedComponent {...this.props} />;
                } else if (
                    this.isProtected &&
                    (!this.jwt ||
                        (this.jwt && this.identity && !this.isSignedIn))
                ) {
                    window.location.replace(process.env.REACT_APP_BASE_URL);
                } else {
                    return NotAuthorized ? (
                        <NotAuthorized {...this.props} />
                    ) : null;
                }
            }
        }
    );
};

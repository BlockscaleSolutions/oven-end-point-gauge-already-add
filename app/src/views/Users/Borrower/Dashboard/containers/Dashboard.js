import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../../../../_actions/loans";
import Dashboard from "../components/Dashboard";

const mapStateToProps = state => ({
    open_obligations: state.Loans.loans,
    open_requests: state.Loans.loans,
    history: state.Loans.loans
});

const mapDispatchToProps = dispatch => ({
    fetchByUserId: user_id => {
        return dispatch(actions.fetchByUserId(user_id));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Dashboard)
);

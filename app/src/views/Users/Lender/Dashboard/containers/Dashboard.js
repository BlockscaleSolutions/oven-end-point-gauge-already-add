import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../../../../_actions/loans";
import Dashboard from "../components/Dashboard";
// import web3 from "Web3";


const mapStateToProps = state => ({
    open: state.Loans.loans,
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

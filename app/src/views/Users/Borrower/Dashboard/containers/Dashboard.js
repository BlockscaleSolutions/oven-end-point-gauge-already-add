import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../../../../_actions/loans";
import Dashboard from "../components/Dashboard";

const mapStateToProps = state => ({
    loans: state.Loans.loans
});

const mapDispatchToProps = dispatch => ({
    fetchFromBlockchain: actions.fetchFromBlockchain,
    fetchByBorrowerId: Borrower_id => {
        return dispatch(actions.fetchByBorrowerId(Borrower_id));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Dashboard)
);

import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../../_actions/loans";
import Loan from "../components/Loan";

const mapStateToProps = state => ({
    loans: state.Loans.loans
});

const mapDispatchToProps = dispatch => ({
    create: (amount, term, interest_rate, Lender_id) => {
        return dispatch(actions.create(amount, term, interest_rate, Lender_id));
    },
    fetchById: id => {
        return dispatch(actions.fetchById(id));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Loan)
);

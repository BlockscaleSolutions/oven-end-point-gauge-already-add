import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../../_actions/loans";
import Loan from "../components/Loan";

const mapStateToProps = state => ({
    loans: state.Loans.loans
});

const mapDispatchToProps = dispatch => ({
    fetch: id => actions.fetchById(id)
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Loan)
);

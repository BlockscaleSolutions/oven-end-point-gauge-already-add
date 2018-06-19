import { connect } from "react-redux";
import * as actions from "../../../_actions/loans";
import Requests from "../components/Requests";

const mapStateToProps = state => ({
    loans: state.Loans.loans
});

const mapDispatchToProps = dispatch => ({
    fetchOpenRequests: () => actions.fetchOpenRequests
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Requests);

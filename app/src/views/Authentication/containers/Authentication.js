import { connect } from "react-redux";
import * as actions from "../../../_actions/authenticate";
import Authentication from "../components/Authentication";

const mapStateToProps = state => {
    return state.Authenticate;
};

const mapDispatchToProps = dispatch => ({
    authenticate: o => dispatch(actions.authenticate(o)),
    reset: () => dispatch(actions.reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);

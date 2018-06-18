import { connect } from "react-redux";
import * as actions from "../../../_actions/user_registration";
import UserRegistration from "../components/UserRegistration";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    register: actions.register
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserRegistration);

import * as types from "../../_constants/types";

export default (state = null, action) => {
    switch (action.type) {
        case types.USER_REGISTRATION_REQUEST_SENT:
            return { loading: true };

        case types.USER_REGISTRATION_REQUEST_COMPLETED:
            return { loading: false };

        case types.USER_REGISTRATION_REQUEST_FAILED:
            return { loading: false, err: action.err };

        case types.RESET:
            return null;

        default:
            return state;
    }
};

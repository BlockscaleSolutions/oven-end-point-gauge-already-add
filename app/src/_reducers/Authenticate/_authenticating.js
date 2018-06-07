import * as _types from "../../_constants/types";

export default (state = null, action) => {
    switch (action.type) {
        case _types.AUTHENTICATING:
            return { fetching: true };

        case _types.AUTHENTICATING_COMPLETED:
            return { fetching: false };

        case _types.AUTHENTICATING_FAILED:
            let err = new Error("something went wrong");
            return {
                fetching: false,
                err: action.err || err
            };

        case _types.RESET:
            return null;

        default:
            return state;
    }
};

import * as _types from "../../_constants/types";

export default (state = null, action) => {
    switch (action.type) {
        case _types.LOANS_FETCHING:
            return { fetching: true };

        case _types.LOANS_FETCHING_COMPLETED:
            return { fetching: false };

        case _types.LOANS_FETCHING_FAILED:
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

import * as types from "../../_constants/types";

export default (state = null, action) => {
    switch (action.type) {
        case types.USER_REGISTERED:
            break;

        case types.RESET:
            return null;

        default:
            state;
    }
};

import * as _types from "../../_constants/types";

export default (state = null, action) => {
    switch (action.type) {
        case _types.AUTHENTICATED:
            return Object.assign({}, action.o);

        case _types.RESET:
        case _types.AUTHENTICATION_RESET:
            return null;

        default:
            return state;
    }
};

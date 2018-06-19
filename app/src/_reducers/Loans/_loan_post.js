import * as _types from "../../_constants/types";

export default (state = null, action) => {
    switch (action.type) {
        case _types.LOAN_CREATED:
            return Object.assign({}, action.loan);

        case _types.RESET:
            return null;

        default:
            return state;
    }
};

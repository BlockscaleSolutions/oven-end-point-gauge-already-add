import * as _types from "../../_constants/types";

export default (state = [], action) => {
    switch (action.type) {
        case _types.LOANS:
            return [...action.loans];

        case _types.RESET:
            return [];

        default:
            return state;
    }
};

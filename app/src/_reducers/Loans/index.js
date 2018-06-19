import { combineReducers } from "redux";

import loan_post from "./_loan_post";
import loan_posting from "./_loan_posting";
import loans from "./_loans";
import loans_fetching from "./_loans_fetching";

export default combineReducers({
    loan_post,
    loan_posting,
    loans,
    loans_fetching
});

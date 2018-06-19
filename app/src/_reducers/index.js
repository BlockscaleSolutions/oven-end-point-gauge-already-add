import { combineReducers } from "redux";

import Authenticate from "./Authenticate";
import Loans from "./Loans";

export default combineReducers(Object.assign({}, {}, { Authenticate, Loans }));

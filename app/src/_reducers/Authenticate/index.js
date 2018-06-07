import { combineReducers } from "redux";

import authenticated from "./_authenticated";
import authenticating from "./_authenticating";

export default combineReducers({ authenticated, authenticating });

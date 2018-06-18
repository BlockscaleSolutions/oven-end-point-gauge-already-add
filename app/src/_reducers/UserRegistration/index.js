import { combineReducers } from "redux";

import registered from "./_registered";
import registering from "./_registering";

export default combineReducers({ registered, registering });

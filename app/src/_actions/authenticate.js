import * as _types from "../_constants/types";
import ws from "../_constants/webservices";

export const reset = () => {
    window.localStorage.removeItem("--jwt--");
    return { type: _types.RESET };
};

export const set = jwt => {
    window.localStorage.setItem("--jwt--", jwt);
    let payload = JSON.parse(window.atob(jwt.split(".")[1]));
    return {
        type: _types.AUTHENTICATED,
        o: {
            name: payload.name,
            roles: payload.role,
            username: payload.unique_name,
            email_address: payload.email_address,
            exp: payload.exp
        }
    };
};

export const authenticate = ({ username, password }) => dispatch => {
    dispatch(reset());
    dispatch({ type: _types.AUTHENTICATING });
    return ws.auth
        .post("/sign-in", { username, password })
        .then(({ json, response }) => {
            return Promise.all([
                dispatch(set(json)),
                dispatch({ type: _types.AUTHENTICATING_COMPLETED })
            ]);
        })
        .catch(err => {
            dispatch(reset());
            dispatch({ type: _types.AUTHENTICATING_FAILED, err });
        });
};

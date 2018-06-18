import * as _types from "../_constants/types";
import ws from "../_constants/webservices";

export const reset = () => ({
    type: _types.RESET
});

export const register = ({
    email_address,
    username,
    password,
    confirm_password
}) => dispatch => {
    debugger;
    dispatch(reset());
    dispatch({ type: _types.USER_REGISTRATION_REQUEST_SENT });
    console.log(2);
    return ws.auth
        .post("registry", {
            email_address,
            username,
            password,
            confirm_password
        })
        .then(({ json, response }) => {
            return Promise.all([
                //dispatch(set(json)),
                dispatch({ type: _types.USER_REGISTRATION_REQUEST_COMPLETED }),
                dispatch({ type: _types.USER_REGISTERED })
            ]);
        })
        .catch(err => {
            dispatch(reset());
            dispatch({ type: _types.USER_REGISTRATION_REQUEST_FAILED, err });
        });
};

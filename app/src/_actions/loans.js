import * as types from "../_constants/types";

export const reset = () => ({
    type: types.RESET
});

export const seed = () => ({ type: types.LOANS, loans: [1, 2, 3] });

export const create = loan => dispatch => {
    dispatch({ type: types.LOAN_POSTED });
    return fetch("https://httpbin.org/post", {
        method: "POST"
    })
        .then(res => res.json())
        .then(json => {
            dispatch({ type: types.LOAN_POSTED_COMPLETED });
            dispatch({ type: types.LOAN_CREATED, loan: json });
            return json;
        })
        .catch(err => {
            dispatch({ type: types.LOAN_POSTED_FAILED, err });
            alert("something went wrong");
        });
};

export const _fetch = id => dispatch => {
    dispatch({ type: types.LOAN_FETCHING });
    return fetch("https://httpbin.org/get", {
        method: "GET"
    })
        .then(res => res.json())
        .then(json => {
            dispatch({ type: types.LOAN_FETCHING_COMPLETED });
            dispatch({ type: types.LOAN, loans: [1, 2, 3] });
            return json;
        })
        .catch(err => {
            dispatch({ type: types.LOAN_FETCHING_FAILED, err });
            alert("something went wrong");
        });
};

export const fetchByUserId = user_id => dispatch => {
    dispatch({ type: types.LOANS_FETCHING });
    return fetch("https://httpbin.org/get", {
        method: "GET"
    })
        .then(res => res.json())
        .then(json => {
            dispatch({ type: types.LOANS_FETCHING_COMPLETED });
            dispatch({ type: types.LOANS, loans: [1, 2, 3] });
            return json;
        })
        .catch(err => {
            dispatch({ type: types.LOANS_FETCHING_FAILED, err });
            alert("something went wrong");
        });
};

export const fetchOpenRequests = () => dispatch => {
    dispatch({ type: types.LOANS_FETCHING });
    return fetch("https://httpbin.org/get", {
        method: "GET"
    })
        .then(res => res.json())
        .then(json => {
            dispatch({ type: types.LOANS_FETCHING_COMPLETED });
            dispatch({ type: types.LOANS, loans: [1, 2, 3] });
            return json;
        })
        .catch(err => {
            dispatch({ type: types.LOANS_FETCHING_FAILED, err });
            alert("something went wrong");
        });
};

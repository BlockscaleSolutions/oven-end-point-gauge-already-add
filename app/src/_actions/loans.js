import * as types from "../_constants/types";

const ROOT_URL = "http://localhost:5000/api/loan-manager";

export const reset = () => ({
    type: types.RESET
});

export const seed = () => ({ type: types.LOANS, loans: [1, 2, 3] });

export const create = (amount, term, interest_rate, Lender_id) => dispatch => {
    let Borrower_id = "0x1";
    debugger;
    window.debt
        .createLoanRequest(100, Borrower_id, Lender_id, {
            from: window.web3.eth.accounts[0],
            gas: 4e6
        })
        .then(tx => {
            dispatch({ type: types.LOAN_POSTED });
            return fetch(ROOT_URL, {
                method: "POST",
                body: JSON.stringify({
                    Borrower_id,
                    Lender_id,
                    amount,
                    term,
                    interest_rate
                }),
                headers: {
                    "Content-Type": "application/json"
                }
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
        })
        .catch();
};

export const fetchById = id => dispatch => {
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

export const fetchAll = () => dispatch => {
    dispatch({ type: types.LOANS_FETCHING });
    return fetch(ROOT_URL, {
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

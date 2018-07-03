import * as types from "../_constants/types";

const ROOT_URL = "http://localhost:5000/api/loan-manager";

export const reset = () => ({
    type: types.RESET
});

export const seed = () => ({ type: types.LOANS, loans: [1, 2, 3] });

export const create = (amount, term, interest_rate, Lender_id) => dispatch => {
    let Borrower_id = window.loggedInAddress;

    return new Promise((resolve, reject) => {
      // resolve('txHash');
      window.sendTxsDebt.createLoanRequest(
          amount,
          Borrower_id,
          Lender_id,
          (err, txHash) => {
            resolve(txHash);
          }
      );
    });
};

export const fetchById = id => dispatch => {
    return _fetch(dispatch).then(json => {
        let loan = json[id];
        dispatch({ type: types.LOAN, loan });
    });
};

let _fetch = dispatch => {
    dispatch({ type: types.LOANS_FETCHING });
    return fetch(ROOT_URL, {
        method: "GET"
    })
        .then(res => res.json())
        .then(json => {
            dispatch({ type: types.LOANS_FETCHING_COMPLETED });
            return json;
        })
        .catch(err => {
            dispatch({ type: types.LOANS_FETCHING_FAILED, err });
            // alert("something went wrong");
        });
};

export const fetchFromBlockchain = () => {
    return new Promise((resolve, reject) => {
        window.getLogsDebt
            .LoanCreated({}, { fromBlock: 2492715, toBlock: "latest" })
            .get((err, res) => {
                if (err) {
                    alert("something went wrong");
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
};

export const fetchAll = () => dispatch => {
    return _fetch(dispatch).then(json => {
        let loans = json;
        dispatch({ type: types.LOANS, loans });
        return loans;
    });
};

let _fetchByProperty = (dispatch, key, value) => {
    return _fetch(dispatch).then(json => {
        let loans = Object.values(json).filter(loan => loan[key] === value);
        dispatch({ type: types.LOANS, loans });
        return loans;
    });
};

export const fetchByBorrowerId = Borrower_id => dispatch => {
    return _fetchByProperty(dispatch, "Borrower_id", Borrower_id);
};

export const fetchByLenderId = Lender_id => dispatch => {
    return _fetchByProperty(dispatch, "Lender_id", Lender_id);
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
            // alert("something went wrong");
        });
};

pragma solidity ^0.4.23;

contract Debt {

    mapping(address => Loan) loans_;

    event LoanCreated(uint256 amount, address borrower, address lender);
    event LoanSignOff(address signedOff);
    event LoanCompleted(bool obligationMet);

    struct Loan {
        uint256 amount;
        address borrower;
        address lender;
        bool loanReceived;
        bool loanPaid;
    }

    function createLoanRequest (
        uint256 amount,
        address borrower,
        address lender
    )   external {
        loans_[borrower] = Loan(amount, borrower, lender, false);
    }

    function loanReceived () public {
        // assume no loans for 0 eth
        require(loans_[msg.sender].amount > 0);
        loans[msg.sender].loanReceived = true;
    }

    function loanPaid (address borrower) public {
        require(loans_[borrower].lender == msg.sender);
        loans[msg.sender].loanPaid = true;
    }
}

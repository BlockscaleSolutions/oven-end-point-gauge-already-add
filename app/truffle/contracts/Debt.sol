pragma solidity ^0.4.23;

contract Debt {

    string public test = "ADAM";

    mapping(address => Loan) public loans_;

    event LoanCreated(uint256 amount, address borrower, address lender);
    event LoanReceived(address borrower);
    event LoanPaid(address lender);

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
    )   external
        returns (bool)
    {
        loans_[borrower] = Loan(amount, borrower, lender, false, false);
        emit LoanCreated(amount, borrower, lender);
        return true;
    }

    function loanReceived () public {
        // assume no loans for 0 eth
        require(loans_[msg.sender].amount > 0);
        loans_[msg.sender].loanReceived = true;
        emit LoanReceived(msg.sender);
    }

    function loanPaid (address borrower) public {
        require(loans_[borrower].lender == msg.sender);
        loans_[msg.sender].loanPaid = true;
        emit LoanPaid(borrower);
        delete loans_[msg.sender];
    }
}

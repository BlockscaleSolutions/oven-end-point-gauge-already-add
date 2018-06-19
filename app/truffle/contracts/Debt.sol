pragma solidity ^0.4.23;

contract Debt {

    struct Loan {
        uint256 amount;
        address borrower;
        address lender;
        mapping (address => bool) hasSignedOff;
    }

    function createLoanRequest () public {

    }

    function acceptLoanRequest () public {}

    function fillLoanRequest () public {}

    function loanPaidOff () public {}
        
}

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using LoanService.Constants;
using LoanService.Dtos;
using LoanService.Models;

namespace LoanService.Services
{
    public class LoanManagerService : ILoanManagerService
    {
        private Dictionary<int, Loan> _loans { get; }
        private Dictionary<int, LoanStatus> _loans_statuses { get; }

        public LoanManagerService()
        {
            this._loans = new Dictionary<int, Loan>();
            this._loans_statuses = new Dictionary<int, LoanStatus>();
        }

        public Loan Create(LoanDto dto)
        {
            var loan = _LoanBuilder(dto);
            var loan_status = _LoanStatusBuilder(LoanStatuses.BORROWER_CREATED);

            _loans.Add(loan.id, loan);
            _loans_statuses.Add(loan_status.id, loan_status);

            return loan;
        }

        public Loan Approved(int id)
        {
            var loan = _loans[id];
            loan.LoanStatuses.Add(_LoanStatusBuilder(LoanStatuses.LENDER_REVIEWED_AND_APPROVED));
            return loan;
        }

        public Loan TermsAccepted(int id)
        {
            var loan = _loans[id];
            loan.LoanStatuses.Add(_LoanStatusBuilder(LoanStatuses.BORROWER_TERMS_ACCEPTED));
            return loan;
        }

        public Loan FundsSent(int id)
        {
            var loan = _loans[id];
            loan.LoanStatuses.Add(_LoanStatusBuilder(LoanStatuses.LENDER_FUNDS_SENT));
            return loan;
        }

        public Loan FundsReceived(int id)
        {
            var loan = _loans[id];
            loan.LoanStatuses.Add(_LoanStatusBuilder(LoanStatuses.BORROWER_FUNDS_RECEIVED));
            return loan;
        }

        public Loan PaymentSent(int id)
        {
            var loan = _loans[id];
            loan.LoanStatuses.Add(_LoanStatusBuilder(LoanStatuses.BORROWER_PAYMENT_SENT));
            return loan;
        }

        public Loan PaymentReceived(int id)
        {
            var loan = _loans[id];
            loan.LoanStatuses.Add(_LoanStatusBuilder(LoanStatuses.LENDER_PAYMENT_RECEIVED));
            return loan;
        }

        public Loan Close(int id)
        {
            var loan = _loans[id];
            loan.LoanStatuses.Add(_LoanStatusBuilder(LoanStatuses.CLOSE));
            return loan;
        }

        private Loan _LoanBuilder(LoanDto dto)
        {
            int loan_id = _loans.Count;
            return new Loan
            {
                id = loan_id,
                Borrower_id = dto.Borrower_id,
                Lender_id = dto.Lender_id,
                amount = dto.amount,
                term = dto.term,
                interest_rate = dto.interest_rate
            };
        }

        private LoanStatus _LoanStatusBuilder(string status)
        {
            int loan_status_id = _loans_statuses.Count;
            return new LoanStatus
            {
                id = loan_status_id,
                timestamp = DateTime.Now,
                status = status
            };
        }
    }
}

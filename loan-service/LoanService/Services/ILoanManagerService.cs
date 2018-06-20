using System.Collections.Generic;
using System.Threading.Tasks;
using LoanService.Dtos;
using LoanService.Models;

namespace LoanService.Services
{
    public interface ILoanManagerService
    {
        Dictionary<int, Loan> Get();
        Loan Create(LoanDto dto);
        Loan Approved(int id);
        Loan TermsAccepted(int id);
        Loan FundsSent(int id);
        Loan FundsReceived(int id);
        Loan PaymentSent(int id);
        Loan PaymentReceived(int id);
        Loan Close(int id);
    }
}

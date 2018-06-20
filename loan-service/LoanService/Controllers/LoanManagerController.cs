using LoanService.Dtos;
using LoanService.Services;
using Microsoft.AspNetCore.Mvc;

namespace LoanService.Controllers
{
    [ApiController]
    [Route("api/loan-manager")]

    public class LoanManagerController : ControllerBase
    {
        private readonly ILoanManagerService _service;

        public LoanManagerController(ILoanManagerService service)
        {
            this._service = service;
        }

        [HttpPost]
        [Route("create")]
        public IActionResult Create(LoanDto dto)
        {
            return Ok(_service.Create(dto));
        }

        [HttpPost]
        [Route("approved")]
        public IActionResult Approved(int loan_id)
        {
            return Ok(_service.Approved(loan_id));
        }

        [HttpPost]
        [Route("terms-accepted")]
        public IActionResult TermsAccepted(int loan_id)
        {
            return Ok(_service.TermsAccepted(loan_id));
        }

        [HttpPost]
        [Route("funds-sent")]
        public IActionResult FundsSent(int loan_id)
        {
            return Ok(_service.FundsSent(loan_id));
        }

        [HttpPost]
        [Route("funds-received")]
        public IActionResult FundsReceived(int loan_id)
        {
            return Ok(_service.FundsReceived(loan_id));
        }

        [HttpPost]
        [Route("payment-sent")]
        public IActionResult PaymentSent(int loan_id)
        {
            return Ok(_service.PaymentSent(loan_id));
        }

        [HttpPost]
        [Route("payment-received")]
        public IActionResult PaymentReceived(int loan_id)
        {
            return Ok(_service.PaymentReceived(loan_id));
        }

        [HttpPost]
        [Route("close")]
        public IActionResult Close(int loan_id)
        {
            return Ok(_service.Close(loan_id));
        }
    }
}

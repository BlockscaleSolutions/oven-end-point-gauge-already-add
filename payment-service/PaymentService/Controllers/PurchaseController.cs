using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PaymentService.Dtos;
using PaymentService.Services;

namespace PaymentService.Controllers
{
    [ApiController]
    [Route("api/purchase")]
    public class PurchaseController : ControllerBase
    {
        private readonly IPurchaseService _service;

        public PurchaseController(IPurchaseService service)
        {
            this._service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Charge(PurchaseDto dto)
        {
            var AspNetUsers_id = "";
            var customer_description = "";
            var charge_description = "";
            await _service.Charge(AspNetUsers_id, customer_description, charge_description, dto);
            return Ok();
        }
    }
}
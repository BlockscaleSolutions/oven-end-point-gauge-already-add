using System.Threading.Tasks;
using PaymentService.Dtos;

namespace PaymentService.Services
{
    public interface IPurchaseService
    {
        Task Charge(
            string AspNetUsers_id,
            string customer_description,
            string charge_description,
            PurchaseDto dto);
    }
}
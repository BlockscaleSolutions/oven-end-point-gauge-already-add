using System.ComponentModel.DataAnnotations;

namespace PaymentService.Dtos
{
    public class PurchaseDto
    {
        [Required]
        public string email { get; set; }

        [Required]
        public string token { get; set; }

        [Required]
        public int amount { get; set; }

        [Required]
        public string currency { get; set; }
    }
}
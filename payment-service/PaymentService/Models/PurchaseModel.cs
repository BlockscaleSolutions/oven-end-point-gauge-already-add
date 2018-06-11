using System;

namespace PaymentService.Models
{
    public class PurchaseModel
    {
        public int id { get; set; }
        public DateTime timestamp { get; set; }
        public string AspNetUsers_id { get; set; }
        public int amount { get; set; }
        public string currency { get; set; }
        public string stripe_token { get; set; }
        public string stripe_customer_id { get; set; }
        public string stripe_charge_id { get; set; }
    }
}
namespace PaymentService.Dtos
{
    public class StripeSettingsDto
    {
        public string SecretKey { get; set; }
        public string PublishableKey { get; set; }
    }
}
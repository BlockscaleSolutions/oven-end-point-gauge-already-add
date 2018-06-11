using System;
using System.Threading.Tasks;
using PaymentService.Dtos;
using PaymentService.Models;
using Stripe;

namespace PaymentService.Services
{
    public class PurchaseService : IPurchaseService
    {
        public async Task Charge(
            string AspNetUsers_id,
            string customer_description,
            string charge_description,
            PurchaseDto dto)
        {
            var customer = await _CreateCustomer(customer_description, dto.email, dto.token);
            var charge = await _CreateCharge(dto.amount, dto.currency, customer.Id, charge_description);
            var model = new PurchaseModel
            {
                timestamp = DateTime.Now,
                AspNetUsers_id = AspNetUsers_id,
                amount = dto.amount,
                currency = dto.currency,
                stripe_token = dto.token,
                stripe_customer_id = customer.Id,
                stripe_charge_id = charge.Id
            };
        }

        private async Task<StripeCustomer> _CreateCustomer(
            string description,
            string email,
            string token)
        {
            var customers = new StripeCustomerService();

            var customer = await customers.CreateAsync(new StripeCustomerCreateOptions
            {
                Description = description,
                Email = email,
                SourceToken = token
            });

            return customer;
        }

        private async Task<StripeCharge> _CreateCharge(
            int amount,
            string currency,
            string customer_id,
            string description
        )
        {
            var charges = new StripeChargeService();

            var charge = await charges.CreateAsync(new StripeChargeCreateOptions
            {
                Amount = amount,
                Currency = currency,
                CustomerId = customer_id,
                Description = description
            });

            return charge;
        }
    }
}
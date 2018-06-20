namespace LoanService.Constants
{
    public class LoanStatuses
    {
        public static readonly string BORROWER_CREATED = "BORROWER_CREATED";
        public static readonly string LENDER_REVIEWED_AND_APPROVED = "LENDER_REVIEWED_AND_APPROVED";
        public static readonly string BORROWER_TERMS_ACCEPTED = "BORROWER_TERMS_ACCEPTED";
        public static readonly string LENDER_FUNDS_SENT = "LENDER_FUNDS_SENT";
        public static readonly string BORROWER_FUNDS_RECEIVED = "BORROWER_FUNDS_RECEIVED";
        public static readonly string BORROWER_PAYMENT_SENT = "BORROWER_PAYMENT_SENT";
        public static readonly string LENDER_PAYMENT_RECEIVED = "LENDER_PAYMENT_RECEIVED";
        public static readonly string CLOSE = "CLOSE";
    }
}

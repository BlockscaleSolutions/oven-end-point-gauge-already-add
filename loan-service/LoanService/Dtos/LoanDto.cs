namespace LoanService.Dtos
{
    public class LoanDto
    {
        public int Borrower_id { get; set; }
        public int Lender_id { get; set; }
        public int amount { get; set; }
        public int term { get; set; }
        public int interest_rate { get; set; }
    }
}

namespace LoanService.Dtos
{
    public class LoanDto
    {
        public string Borrower_id { get; set; }
        public string Lender_id { get; set; }
        public int amount { get; set; }
        public int term { get; set; }
        public int interest_rate { get; set; }
    }
}

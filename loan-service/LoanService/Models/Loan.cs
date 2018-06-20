using System.Collections.Generic;

namespace LoanService.Models
{
    public class Loan
    {
        public Loan()
        {
            this.LoanStatuses = new HashSet<LoanStatus>();
        }

        public int id { get; set; }
        public int Borrower_id { get; set; }
        public int Lender_id { get; set; }
        public int amount { get; set; }
        public int term { get; set; }
        public int interest_rate { get; set; }

        public HashSet<LoanStatus> LoanStatuses { get; set; }
    }
}

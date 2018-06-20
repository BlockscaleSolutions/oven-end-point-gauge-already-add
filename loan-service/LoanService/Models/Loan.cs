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
        public string Borrower_id { get; set; }
        public string Lender_id { get; set; }
        public int amount { get; set; }
        public int term { get; set; }
        public int interest_rate { get; set; }

        public bool is_active { get; set; }

        public HashSet<LoanStatus> LoanStatuses { get; set; }
    }
}

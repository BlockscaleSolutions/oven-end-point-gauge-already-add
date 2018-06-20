using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace LoanService.Models
{
    public class LoanStatus
    {
        public int id { get; set; }
        public DateTime timestamp { get; set; }
        public string status { get; set; }
    }
}

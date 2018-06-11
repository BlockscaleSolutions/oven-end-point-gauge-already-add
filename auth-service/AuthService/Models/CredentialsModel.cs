using System.ComponentModel.DataAnnotations;

namespace AuthService.Models
{
    public class CredentialsModel
    {
        [Required]
        public string identifier { get; set; }

        [Required]
        public string password { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;

namespace AuthService.Dtos
{
    public class CredentialsDto
    {
        [Required]
        public string identifier { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string password { get; set; }
    }
}
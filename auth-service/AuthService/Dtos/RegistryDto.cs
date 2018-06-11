using System.ComponentModel.DataAnnotations;

namespace AuthService.Dtos
{
    public class RegistryDto
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string email_address { get; set; }

        [Required]
        public string username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string password { get; set; }

        [Required]
        [Compare("password")]
        [DataType(DataType.Password)]
        public string confirm_password { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;

namespace BarberApp.Domain.Dto.User
{
    public class UpdateUserDto
    {
        public string Name { get; set; } = null!;
        public string Lastname { get; set; } = null!;
        [EmailAddress(ErrorMessage = "Email inválido!")]
        public string Email { get; set; } = null!;
        public string Cep { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        [StringLength(30, MinimumLength = 8, ErrorMessage = "Senha deve conter minimo de 8 caracteres")]
        public string Password { get; set; } = null!;
        public int? Plano { get; set; }
    }
}

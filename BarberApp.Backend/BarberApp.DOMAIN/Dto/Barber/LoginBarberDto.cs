using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;


namespace BarberApp.Domain.Dto.Barber
{
    public class LoginBarberDto
    {
        [Required(ErrorMessage = "Email é obrigatório")]
        [EmailAddress(ErrorMessage = "Email inválido")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Senha obrigatória")]
        public string Password { get; set; }
        [BsonElement("userLevel")]
        public int UserLevel { get; set; }
    }
}

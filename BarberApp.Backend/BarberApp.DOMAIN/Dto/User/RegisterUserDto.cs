using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using BarberApp.Domain.Models;

namespace BarberApp.Domain.Dto.User
{
    public class RegisterUserDto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonIgnore]
        [BsonElement("userId")]
        public string UserId { get; set; }
        [BsonElement("firstName")]
        [Required(ErrorMessage = "Primeiro nome é obrigatório")]
        public string FirstName { get; set; } = null!;
        [BsonElement("lastName")]
        [Required(ErrorMessage = "Último nome é obrigatório")]
        public string LastName { get; set; } = null!;
        [BsonElement("cep")]
        [Required(ErrorMessage = "Cep é obrigatório")]
        public string Cep { get; set; } = null!;
        [BsonElement("email")]
        [Required(ErrorMessage = "Email é obrigatório")]
        [EmailAddress(ErrorMessage = "Email inválido")]
        public string Email { get; set; } = null!;
        [BsonElement("password")]
        [Required(ErrorMessage = "Senha é obrigatório")]
        [StringLength(30, MinimumLength = 8, ErrorMessage = "Senha deve conter minimo de 8 caracteres")]
        public string Password { get; set; } = null!;
        [BsonElement("phoneNumber")]
        [Required(ErrorMessage = "Telefone é obrigatório")]
        public string PhoneNumber { get; set; } = null!;
        [BsonElement("passwordSalt")]
        [JsonIgnore]
        public string PasswordSalt { get; set; }
        [BsonElement("workingDays")]
        public List<WeekDays> WorkingDays { get; set; }
    }
}

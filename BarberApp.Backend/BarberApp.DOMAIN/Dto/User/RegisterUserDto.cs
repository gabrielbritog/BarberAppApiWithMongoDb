using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BarberApp.Domain.Dto.User
{
    public class RegisterUserDto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonIgnore]
        public string? UserId { get; set; }
        [BsonElement("firstName")]
        public string FirstName { get; set; } = null!;
        [BsonElement("lastName")]
        public string LastName { get; set; } = null!;
        [BsonElement("cep")]
        public string Cep { get; set; } = null!;
        [BsonElement("email")]
        [Required(ErrorMessage = "Email é obrigatório")]
        [EmailAddress(ErrorMessage = "Email inválido")]
        public string Email { get; set; } = null!;
        [BsonElement("password")]
        [StringLength(30, MinimumLength = 8, ErrorMessage = "Senha deve conter minimo de 8 caracteres")]
        public string Password { get; set; } = null!;
        [BsonElement("phoneNumber")]
        public string PhoneNumber { get; set; } = null!;
    }
}

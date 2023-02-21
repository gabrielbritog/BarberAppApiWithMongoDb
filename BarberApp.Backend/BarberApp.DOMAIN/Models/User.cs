using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace BarberApp.Domain.Models
{
    public class User
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonIgnore]
        [BsonElement("UserId")]
        public string UserId { get; set; }
        [BsonElement("firstName")]
        public string FirstName { get; set; } = null!;
        [BsonElement("lastName")]
        public string LastName { get; set; } = null!;
        [BsonElement("cep")]
        public string Cep { get; set; } = null!;
        [BsonElement("email")]
        public string Email { get; set; } = null!;
        [BsonElement("urlImage")]
        public string UrlImage { get; set; } = null!;
        [BsonElement("password")]
        public string Password { get; set; } = null!;
        [BsonElement("phoneNumber")]
        public string PhoneNumber { get; set; } = null!;
        [BsonElement("userLevel")]
        public int UserLevel { get; set; }
        [BsonElement("userRegistration")]
        public DateTime UserRegistration { get; set; }
        [JsonIgnore]
        [BsonElement("passwordSalt")]
        public string PasswordSalt { get; set; }
        [BsonElement("disabled")]
        public bool Disabled { get; set; } 
        [BsonElement("workingDays")]
        public List<WeekDays> WorkingDays { get; set; }

    }
}

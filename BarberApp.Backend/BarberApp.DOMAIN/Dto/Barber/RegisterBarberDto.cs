using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using BarberApp.Domain.Models;

namespace BarberApp.Domain.Dto.Barber
{
    public class RegisterBarberDto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonIgnore]
        public string BarberId { get; set; }
        [BsonElement("userId")]
        [JsonIgnore]
        public string UserId { get; set; }
        [BsonElement("firstName")]
        public string FirstName { get; set; } = null!;
        [BsonElement("lastName")]
        public string LastName { get; set; } = null!;
        [BsonElement("email")]
        public string Email { get; set; } = null!;
        [BsonElement("urlImage")]
        public string UrlImage { get; set; } = null!;
        [BsonElement("password")]
        public string Password { get; set; } = null!;
        [BsonElement("phoneNumber")]
        public string PhoneNumber { get; set; } = null!;
        [BsonElement("userRegistration")]
        [JsonIgnore]
        public DateTime UserRegistration { get; set; }
        [JsonIgnore]
        [BsonElement("passwordSalt")]
        public string PasswordSalt { get; set; }
        [BsonElement("disabled")]
        [JsonIgnore]
        public bool Disabled { get; set; }
        [BsonElement("workingDays")]
        public List<WeekDays> WorkingDays { get; set; }
    }

}

﻿using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Text.Json.Serialization;

namespace BarberApp.Domain.Models
{
    public class Barber
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("barberId")]
        public string BarberId { get; set; }
        [BsonElement("userId")]
        public string UserId { get; set; }
        [BsonElement("companyName")]
       public string CompanyName { get; set; }
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
        [BsonElement("userRegistration")]
        public DateTime UserRegistration { get; set; }
        [JsonIgnore]
        [BsonElement("passwordSalt")]
        public string PasswordSalt { get; set; }
        [BsonElement("disabled")]
        public bool Disabled { get; set; }
        [BsonElement("workingDays")]
        public List<WeekDays> WorkingDays { get; set; }
        [BsonElement("userConfig")]
        public UserConfig UserConfig { get; set; }
        [BsonElement("changePassword")]
        public ChangePassword ChangePassword { get; set; }

    }
}

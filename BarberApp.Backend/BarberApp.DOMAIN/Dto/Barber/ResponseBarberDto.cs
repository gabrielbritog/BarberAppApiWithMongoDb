using BarberApp.Domain.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BarberApp.Domain.Dto.Barber
{
    public class ResponseBarberDto
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
        [BsonElement("email")]
        public string Email { get; set; } = null!;
        [BsonElement("urlImage")]
        public string UrlImage { get; set; } = null!;
        [BsonElement("phoneNumber")]
        public string PhoneNumber { get; set; } = null!;
        [BsonElement("userRegistration")]
        public DateTime UserRegistration { get; set; }
        [BsonElement("disbled")]
        public bool Disabled { get; set; }
        [BsonElement("workingDays")]
        public List<WeekDays> WorkingDays { get; set; }
        [BsonElement("userConfig")]
        public UserConfig UserConfig { get; set; }
        [BsonElement("changePassword")]
        public ChangePassword ChangePassword { get; set; }
    }
}

using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Text.Json.Serialization;
using BarberApp.Domain.Enums;

namespace BarberApp.Domain.Models
{
    public class Client
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonIgnore]
        [BsonElement("clientId")]
        public string ClientId { get; set; }
        [JsonIgnore]
        [BsonElement("lastVisit")]
        public DateTime LastVisit { get; set; }
        [JsonIgnore]
        [BsonElement("userId")]
        public string UserId { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("phone")]
        public string Phone { get; set; }
        [BsonElement("schedulingCount")]
        public int SchedulingCount { get; set; }
        [BsonElement("email")]
        public string Email { get; set; }
        [BsonElement("age")]
        public int Age { get; set; }
        [BsonElement("dateOfBirth")]
        public DateTime DateOfBirth { get; set; }
        [BsonElement("civilStatus")]
        public CivilStatus CivilStatus { get; set; }
        [BsonElement("rg")]
        public string Rg { get; set; } = null!;
        [BsonElement("cpf")]
        public string Cpf { get; set; } = null!;
        [BsonElement("adress")]
        public Adress Adress { get; set; } = null!;
        [BsonElement("retiree")]
        public bool Retiree { get; set; }
        [BsonElement("occupation")]
        public string Occupation { get; set; }
        [BsonElement("emergencyContact")]
        public EmergencyContact EmergencyContact { get; set; }
        [BsonElement("death")]
        public bool Death { get; set; }
        [BsonElement("ClassesId")]
        public List<string> ClassesId { get; set; }
        [BsonElement("Observation")]
        public string Observation { get; set; }
        [BsonElement("registerNumber")]
        public string RegisterNumber { get; set; }
        [BsonElement("interviewNumber")]
        public string InterviewNumber { get; set; }


    }
}

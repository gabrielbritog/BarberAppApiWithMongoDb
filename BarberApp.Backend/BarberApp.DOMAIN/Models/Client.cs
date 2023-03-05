using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Text.Json.Serialization;

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
    }
}

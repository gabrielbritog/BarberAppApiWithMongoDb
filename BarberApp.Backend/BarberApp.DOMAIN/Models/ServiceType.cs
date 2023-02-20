using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Text.Json.Serialization;

namespace BarberApp.Domain.Models
{
    public class ServiceType
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
       public string ServiceTypeId { get; set; }
        [BsonElement("UserId")]
        [JsonIgnore]
        public string UserId { get; set; }
        [BsonElement("barberId")]
        public string? barberId { get; set; }
        [BsonElement("nameService")]
        public string NameService { get; set; }
        [BsonElement("valueService")]
        public decimal ValueService { get; set; }
        [BsonElement("on")]
        public bool On { get; set; }
    }
}

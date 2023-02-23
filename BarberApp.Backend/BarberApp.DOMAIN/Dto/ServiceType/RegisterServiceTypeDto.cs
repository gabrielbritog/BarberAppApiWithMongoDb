using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;


namespace BarberApp.Domain.Dto.ServiceType
{
    public class RegisterServiceTypeDto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("serviceTypeId")]
        public string ServiceTypeId { get; set; }
        [BsonElement("UserId")]
        [JsonIgnore]
        public string UserId { get; set; }
        [BsonElement("nameService")]
        public string NameService { get; set; }
        [BsonElement("valueService")]
        public decimal ValueService { get; set; }
        [BsonElement("on")]
        [JsonIgnore]
        public bool On { get; set; }
        [BsonElement("barberId")]
        public string? barberId { get; set; }
        [BsonElement("duration")]
        public string Duration { get; set; }
    }
}

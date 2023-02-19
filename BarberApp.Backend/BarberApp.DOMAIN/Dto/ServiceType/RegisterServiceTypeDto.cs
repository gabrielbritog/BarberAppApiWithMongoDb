using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;


namespace BarberApp.Domain.Dto.ServiceType
{
    public class RegisterServiceTypeDto
    {
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
    }
}

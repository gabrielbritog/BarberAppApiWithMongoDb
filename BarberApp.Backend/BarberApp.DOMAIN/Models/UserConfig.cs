using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Text.Json.Serialization;

namespace BarberApp.Domain.Models
{
    public class UserConfig
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonIgnore]
        [BsonElement("userConfigId")]
        public string UserConfigId { get; set; }
        [BsonElement("darkmode")]
        public bool Darkmode { get; set; }
        [BsonElement("primaryColor")]
        public string PrimaryColor { get; set; }
        [BsonElement("secondaryColor")]
        public string SecondaryColor { get; set; }
        [BsonElement("AltColor")]
        public string AltColor { get; set; }
        [BsonElement("fontSize")]
        public string FontSize { get; set; }
        [BsonElement("dueDate")]
        public DateTime DueDate { get; set; }
        [BsonElement("checks")]
        public Checks Checks { get; set; }
        [BsonElement("pageTitles")]
        public Dictionary<string, string> PageTitles { get; set; }
    }
}

using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Text.Json.Serialization;

namespace BarberApp.Domain.Models
{
    public class EvaluationSheet
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonIgnore]
        [BsonElement("clientId")]
        public string Id { get; set; }
        [BsonElement("entryTime")]
        public string EntryTime { get; set; }
        [BsonElement("departureTime")]
        public string DepartureTime { get; set; }
        [BsonElement("details")]
        public string Details { get; set; }
        [BsonElement("practicePhysicalActivity")]
        public bool PracticePhysicalActivity { get; set; }
        [BsonElement("physicalActivity")]
        public string PhysicalActivity { get; set; }
        [BsonElement("bodyProportions")]
        public BodyProportions BodyProportions { get; set; }
        [BsonElement("observations")]
        public string Observations { get; set; }
        [BsonElement("appraiser")]
        public string Appraiser { get; set; }
        [BsonElement("dateOfAssessment")]
        public DateTime DateOfAssessment { get; set; }
        [BsonElement("certificateDelivered")]
        public DateTime CertificateDelivered { get; set; }
        [BsonElement("dateOfReturn")]
        public DateTime DateOfReturn { get; set; }
        [BsonElement("Checks")]
        public Checks Checks { get; set; }

    }
}

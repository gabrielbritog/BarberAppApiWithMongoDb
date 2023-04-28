using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Text.Json.Serialization;

namespace BarberApp.Domain.Models
{
    public class Scheduling
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string SchedulingId { get; set; }
        [BsonElement("userId")]
        public string UserId { get; set; }
        [BsonElement("class")]
        public Class Class { get; set; } = null!;

        [BsonElement("client")]
        public Client Client { get; set; } = null!;
        [BsonElement("serviceType")]
        public List<ServiceType> ServiceType { get; set; }
        [BsonElement("total")]
        public decimal Total { get; set; }
        [BsonElement("schedulingDate")]
        public DateTime SchedulingDate { get; set; }
        [BsonElement("endOfSchedule")]
        public DateTime EndOfSchedule { get; set; }
        [BsonElement("barberId")]
        public string BarberId { get; set; }
        [BsonElement("recurrence")]
        public Recurrence Recurrence { get; set; }



    }
}

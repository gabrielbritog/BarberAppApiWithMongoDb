using BarberApp.Domain.Dto.ServiceType;
using BarberApp.Domain.Models;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BarberApp.Domain.Dto.Scheduling
{
    public class RegisterSchedulingDto
    {
        [BsonElement("clientName")]
        public string ClientName { get; set; } = null!;
        [BsonElement("serviceType")]
        public List<RegisterServiceTypeDto> ServiceType { get; set; }
        [BsonElement("schedulingDate")]
        public DateTime? SchedulingDate { get; set; }
        [BsonElement("endOfSchedule")]
        public DateTime? EndOfSchedule { get; set; }
        [BsonElement("barberId")]
        [JsonIgnore]
        public string barberId { get; set; } = null!;
    }
}

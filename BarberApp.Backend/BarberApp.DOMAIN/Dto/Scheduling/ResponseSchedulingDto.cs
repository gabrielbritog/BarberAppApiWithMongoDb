using BarberApp.Domain.Dto.ServiceType;
using BarberApp.Domain.Models;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Dto.Scheduling
{
    public class ResponseSchedulingDto
    {
        public string SchedulingId { get; set; }
        [BsonElement("clientName")]
        public string ClientName { get; set; }
        [BsonElement("serviceType")]
        public List<RegisterServiceTypeDto> ServiceType { get; set; }
        [BsonElement("schedulingDate")]
        public DateTime SchedulingDate { get; set; }
    }
}

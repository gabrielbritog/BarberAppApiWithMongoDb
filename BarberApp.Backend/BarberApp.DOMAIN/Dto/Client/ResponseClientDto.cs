using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BarberApp.Domain.Dto.Client
{
    public class ResponseClientDto
    {
        [JsonIgnore]
        [BsonElement("clientId")]
        public string ClientId { get; set; }
        [BsonElement("schedulingCount")]
        public int SchedulingCount { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("phone")]
        public string Phone { get; set; }
    }
}

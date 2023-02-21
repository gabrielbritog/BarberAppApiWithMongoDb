using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BarberApp.Domain.Dto.ServiceType
{
    public class ResponseServiceTypeDto
    {
        public string ServiceTypeId { get; set; }
        [BsonElement("nameService")]
        public string NameService { get; set; }
        [BsonElement("valueService")]
        public decimal ValueService { get; set; }
        [BsonElement("on")]
        public bool On { get; set; }
        [BsonElement("barberId")]
        [JsonIgnore]
        public string? barberId { get; set; }
        [BsonElement("duration")]
        public string Duration { get; set; }
    }
}

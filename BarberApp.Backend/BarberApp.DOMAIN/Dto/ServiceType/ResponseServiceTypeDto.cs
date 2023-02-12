using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Dto.ServiceType
{
    public class ResponseServiceTypeDto
    {
        [BsonElement("nameService")]
        public string NameService { get; set; }
        [BsonElement("valueService")]
        public decimal ValueService { get; set; }
    }
}

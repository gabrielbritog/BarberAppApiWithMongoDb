using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Models
{
    public class EmergencyContact
    {
        [BsonElement("phone")]
        public string Phone { get; set; } = null!;
        [BsonElement("phoneResidential")]
        public string PhoneResidential { get; set; } = null!;
        [BsonElement("kinship")]
        public string Kinship { get; set; } = null!;
        [BsonElement("name")]
        public string Name { get; set; } = null!;
    }
}

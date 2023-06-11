using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Models
{
    public class BodyProportions
    {
        [BsonElement("weight")]
        public double Weight { get; set; }
        [BsonElement("height")]
        public double Height { get; set; }
        [BsonElement("bloodPressure")]
        public string BloodPressure { get; set; }
        [BsonElement("imc")]
        public double Imc { get; set; }   
        [BsonElement("classification")]
        public string Classification { get; set; }
        [BsonElement("waist")]
        public double Waist { get; set; }
        [BsonElement("hip")]
        public double Hip { get; set; }
        [BsonElement("abdomen")]
        public double Abdomen { get; set; }

    }
}

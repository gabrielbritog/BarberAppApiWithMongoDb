using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Models
{
    public class Adress
    {
        [BsonElement("street")]
        public string Street { get; set; }
        [BsonElement("city")]
        public string City { get; set; }
        [BsonElement("cpf")]
        public string Cpf { get; set; }
        [BsonElement("zone")]
        public string Zone { get; set; }
        [BsonElement("uf")]
        public string Uf { get; set; }
        [BsonElement("number")]
        public string Number { get; set; }
        [BsonElement("country")]
        public string Country { get; set; }
        [BsonElement("cep")]
        public string Cep { get; set; }
    }
}

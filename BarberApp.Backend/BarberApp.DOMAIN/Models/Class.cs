using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Models
{
    public class Class
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("id")]
        public string Id { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("clients")]
        public List<Client> Clients { get; set; }
        [BsonElement("presence")]
        public List<string> Presence { get; set; }

    }
}

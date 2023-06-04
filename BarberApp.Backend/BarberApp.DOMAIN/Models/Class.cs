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
        [BsonElement("userId")]
        public string UserId { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("clientsId")]
        public List<string> ClientsId { get; set; }
        [BsonElement("presenceId")]
        public List<string> PresencesId { get; set; }
        [BsonElement("servicesId")]
        public List<string> ServicesId { get; set; }

        [BsonElement("disabled")]
        public bool Disabled { get; set; } = false;


    }
}

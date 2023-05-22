using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Dto.Class
{
    public class UpdateClassDto
    {
        [BsonElement("id")]
        public string Id { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("clientsId")]
        public List<string> ClientsId { get; set; }
        [BsonElement("presenceId")]
        public List<string> PresencesId { get; set; }
        [BsonElement("disabled")]
        public bool Disabled { get; set; }
    }
}

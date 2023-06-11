using MongoDB.Bson.Serialization.Attributes;


namespace BarberApp.Domain.Models
{
    public class Checks
    {
        [BsonElement("title")]
        public string Title { get; set; }
        [BsonElement("listChecks")]
        public List<Check> ListChecks { get; set; }
        [BsonElement("observation")]
        public string Observation { get; set; }
    }
    public class Check
    {
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("isChecked")]
        public bool IsChecked { get; set; }
    }
}

﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BarberApp.Domain.Models
{
    public class WeekDays
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonIgnore]
        [BsonElement("weekDaysId")]
        public string WeekDaysId { get; set; }
        [BsonElement("day")]
        public string Day { get; set; }
        [BsonElement("openingTime")]
        public string OpeningTime { get; set; }
        [BsonElement("ClosingTime")]
        public string ClosingTime { get; set; }
        [BsonElement("isOpen")]
        public bool IsOpen { get; set; }
        [BsonElement("intervalTime")]
        public string IntervalTime { get; set; }
        [BsonElement("index")]
        public int Index { get; set; }
    }
}

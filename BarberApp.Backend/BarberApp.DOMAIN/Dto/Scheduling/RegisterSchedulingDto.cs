﻿using BarberApp.Domain.Dto.Client;
using BarberApp.Domain.Dto.ServiceType;
using BarberApp.Domain.Models;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BarberApp.Domain.Dto.Scheduling
{
    public class RegisterSchedulingDto
    {
        [BsonElement("client")]
        public RegisterClientDto Client { get; set; } = null!;
        [BsonElement("class")]
        public Class Class { get; set; } = null!;
        [BsonElement("serviceType")]
        public List<RegisterServiceTypeDto> ServiceType { get; set; }
        [BsonElement("total")]
        [JsonIgnore]
        public decimal Total { get; set; }
        [BsonElement("schedulingDate")]
        public DateTime? SchedulingDate { get; set; }
        [BsonElement("endOfSchedule")]
        public DateTime? EndOfSchedule { get; set; }
        [BsonElement("barberId")]
        public string barberId { get; set; } = null!;
        [BsonElement("recurrence")]
        public Recurrence Recurrence { get; set; }
    }
}

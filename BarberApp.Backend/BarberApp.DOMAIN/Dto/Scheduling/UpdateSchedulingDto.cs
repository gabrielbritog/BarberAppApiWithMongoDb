﻿using BarberApp.Domain.Dto.Client;
using BarberApp.Domain.Dto.ServiceType;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BarberApp.Domain.Dto.Scheduling
{
    public class UpdateSchedulingDto
    {
        public string SchedulingId { get; set; }
        [BsonElement("client")]
        public RegisterClientDto Client { get; set; } = null!;
        [BsonElement("serviceType")]
        public List<RegisterServiceTypeDto> ServiceType { get; set; }
        [BsonElement("total")]
        public decimal Total { get; set; }
        [BsonElement("schedulingDate")]
        public DateTime? SchedulingDate { get; set; }
        [BsonElement("endOfSchedule")]
        public DateTime? EndOfSchedule { get; set; }
        [BsonElement("barberId")]
        [JsonIgnore]
        public string barberId { get; set; } = null!;
    }
}

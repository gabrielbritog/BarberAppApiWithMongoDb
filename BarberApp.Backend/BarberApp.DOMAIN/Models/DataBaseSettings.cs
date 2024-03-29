﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Models
{
    public class DataBaseSettings
    {
        public string ConnectionString { get; set; } = null;
        public string DatabaseName { get; set; } = null;
        public string CollectionName { get; set; } = null;
        public string BarberCollectionName { get; set; } = null;
        public string SchedulingCollectionName { get; set; } = null;
        public string ServiceTypeCollectionName { get; set; } = null;
        public string ClientTypeCollectionName { get; set; } = null;
        public string CompanyTypeCollectionName { get; set; } = null;

        
    }
}

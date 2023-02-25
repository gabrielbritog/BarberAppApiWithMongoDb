using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Dto.Scheduling
{
    public class HistoricSchedulingDto
    {
        public string SchedulingDate { get; set; }
        public string Client { get; set; }
        public string BarberName { get; set; }
        public List<string> Service { get; set; }
        public string Total { get; set; }
    }
}

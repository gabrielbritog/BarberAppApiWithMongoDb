using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Dto.Scheduling
{
    public class ResponseHistoricSchedulingDto
    {
        public List<HistoricSchedulingDto> Historic { get; set; }
        public string PeriodTotal { get; set; }
    }
}

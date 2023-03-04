using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Models
{
    public class Recurrence
    {
        public enum RecurrencePeriod
        {
            Daily = 1,
            Weekly = 7,
            EveryTwoWeeks = 14,
            Monthly = 30
          
        }
        public RecurrencePeriod RecurrencePeriods { get; set; }
        public bool IsRecurrence { get; set; }
    }
}

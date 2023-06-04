using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Models
{
    public class SchedulingClass
    {
        public string ClassId { get; set; }
        public List<ClientPresence> PresenceList { get; set; }
    }
}

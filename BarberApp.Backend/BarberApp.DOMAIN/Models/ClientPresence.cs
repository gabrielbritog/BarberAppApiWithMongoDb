using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Models
{
    public class ClientPresence
    {
        public string ClientId { get; set; }
        public bool Presence { get; set; }
    }
}

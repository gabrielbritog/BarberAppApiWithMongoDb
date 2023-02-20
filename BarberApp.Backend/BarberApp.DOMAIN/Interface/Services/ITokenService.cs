using BarberApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Interface.Services
{
    public interface ITokenService
    {
        string GenerateToken(User user);
        string GenerateTokenBarber(Barber barber);
    }
}

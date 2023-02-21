using BarberApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Interface.Repositories
{
    public interface IClientRepository
    {
        public Task<Client> Register(Client client);
        public Task<Client> GetByPhone(string phone);
        public Task<Client> Update(Client client);

    }
}

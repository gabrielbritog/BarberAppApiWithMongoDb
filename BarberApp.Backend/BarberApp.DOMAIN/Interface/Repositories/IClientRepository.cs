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
        public Task<List<Client>> GetTop(string userId, int top, DateTime first, DateTime last);
        public Task<List<Client>> GetAll(string userId);
        public Task<List<Client>> GetMany(string userId,int start, int count);

    }
}

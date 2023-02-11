using BarberApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Interface.Repositories
{
    public interface IUserRepository
    {
        public Task<User> Register(User user);
        public Task<User> Update(User user);
        public Task<User> GetById(User user);
        public Task<User> GetByEmail(string email);
    }
}

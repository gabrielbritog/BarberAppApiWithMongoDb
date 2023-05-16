using BarberApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Interface.Repositories
{
    public interface IClassRepository
    {
        public Task<Class> Register(Class classItem);
        public Task<Class> Update(Class classItem);
        public Task<Class> GetById(string userId, string id);
        public Task<List<Class>> GetAll(string userId);
        public Task<List<Class>> GetMany(string userId, int start, int count);
    }
}

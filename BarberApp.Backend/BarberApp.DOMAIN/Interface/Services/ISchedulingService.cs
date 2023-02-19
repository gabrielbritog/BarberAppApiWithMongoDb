using BarberApp.Domain.Dto.Scheduling;
using BarberApp.Domain.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Interface.Services
{
    public interface ISchedulingService
    {
        public Task<RegisterSchedulingDto> Register(RegisterSchedulingDto scheduling, string UserId);
        public Task<Scheduling> GetById(string schedulingId, string userId);
        public Task<DeleteResult> DeleteAll(string userId);
        public Task<List<Scheduling>> GetAll(string userId);
        public Task<Scheduling> Update(Scheduling scheduling, string userId);

    }
}

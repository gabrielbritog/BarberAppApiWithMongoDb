using BarberApp.Domain.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Interface.Repositories
{
    public interface ISchedulingRepository
    {
        public Task<Scheduling> Register(Scheduling scheduling, string userId);
        public Task<Scheduling> GetById(string schedulingId, string userId);
        public Task<DeleteResult> DeleteAll(string userId);
        public Task<DeleteResult> DeleteAll(string userId, string barberId);
        public Task<DeleteResult> DeleteById(string userId, string schedulingId);
        public Task<List<Scheduling>> GetMany(string userId, int start, int count);
        public Task<List<Scheduling>> GetManyDesc(string userId, int start, int count);
        public Task<List<Scheduling>> GetMany(string userId, string barberId, int start, int count);
        public Task<List<Scheduling>> GetManyByDate(string userId,DateTime startDate, DateTime endDate);
        public Task<List<Scheduling>> GetManyByDate(string userId,string barberId,DateTime startDate, DateTime endDate);
        public Task<Scheduling> Update(Scheduling scheduling, string schedulingId, string userId);


    }
}

using BarberApp.Domain.Dto.Scheduling;
using BarberApp.Domain.Dto.User;
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
        public Task<ResponseSchedulingDto> Register(RegisterSchedulingDto scheduling, string UserId);
        public Task<ResponseSchedulingDto> Register(RegisterSchedulingDto scheduling, string UserId, string barberId);
        public Task<ResponseSchedulingDto> GetById(string schedulingId, string userId);
        public Task<DeleteResult> DeleteAll(string userId);
        public Task<DeleteResult> DeleteAll(string userId, string barberId);
        public Task<DeleteResult> DeleteById(string userId, string schedulingId);
        public Task<List<ResponseSchedulingDto>> GetMany(string userId, int start, int count);
        public Task<List<ResponseSchedulingDto>> GetMany(string userId, string barberId, int start, int count);
        public Task<ResponseSchedulingDto> Update(UpdateSchedulingDto scheduling, string userId);

    }
}

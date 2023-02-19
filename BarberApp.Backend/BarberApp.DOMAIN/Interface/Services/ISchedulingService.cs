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
        public Task<ResponseSchedulingDto> GetById(string schedulingId, string userId);
        public Task<DeleteResult> DeleteAll(string userId);
        public Task<DeleteResult> DeleteById(string userId, string schedulingId);
        public Task<List<ResponseSchedulingDto>> GetAll(string userId);
        public Task<ResponseSchedulingDto> Update(UpdateSchedulingDto scheduling, string userId);

    }
}

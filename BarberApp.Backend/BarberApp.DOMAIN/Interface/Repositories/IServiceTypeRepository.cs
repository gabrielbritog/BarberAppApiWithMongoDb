using BarberApp.Domain.Dto.Scheduling;
using BarberApp.Domain.Dto.ServiceType;
using BarberApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Interface.Repositories
{
    public interface IServiceTypeRepository
    {
        public Task<ServiceType> Register(ServiceType serviceType, string UserId);
        public Task<ServiceType> GetById(string userId, string idService);
        public Task<List<ServiceType>> GetMany(string userId, int start, int count);
        public Task<ServiceType> Delete(ServiceType serviceType, string UserId);
        public Task<ServiceType> Update(ServiceType serviceType, string serviceTypeId, string userId);



    }
}

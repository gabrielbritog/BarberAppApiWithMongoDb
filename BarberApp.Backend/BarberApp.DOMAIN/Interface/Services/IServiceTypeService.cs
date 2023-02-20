using BarberApp.Domain.Dto.ServiceType;
using BarberApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Interface.Services
{
    public interface IServiceTypeService
    {
        public Task<RegisterServiceTypeDto> Register(RegisterServiceTypeDto serviceType, string UserId);
        public Task<RegisterServiceTypeDto> Register(RegisterServiceTypeDto serviceType, string UserId, string barberId);
        public Task<ServiceType> GetById(string userId, string idService);
        public Task<List<ServiceType>> GetMany(string userId, int start, int count);
        public Task<List<ServiceType>> GetMany(string userId, string barberId, int start, int count);
        public Task<ServiceType> Delete(RegisterServiceTypeDto serviceType, string UserId);
        public Task<ResponseServiceTypeDto> Update(UpdateServiceTypeDto serviceType, string userId);
    }
}
